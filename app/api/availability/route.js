import { NextResponse } from "next/server";
import ical from "node-ical";

/**
 * Ekostay iCal Availability API
 *
 * Fetches and parses iCal feeds from Ekostay to get blocked/booked dates.
 * Results are cached in-memory for 15 minutes to avoid excessive requests.
 *
 * GET /api/availability?villa=vistara-villa
 * → { blockedDates: [{ start: "2026-08-10", end: "2026-08-12", summary: "..." }, ...] }
 */

// ── iCal URL mapping per villa slug ─────────────────────────────────────────
const ICAL_URLS = {
  "vistara-villa": process.env.EKOSTAY_ICAL_VISTARA,
  "amora-villa": process.env.EKOSTAY_ICAL_AMORA,
};

// ── In-memory cache ─────────────────────────────────────────────────────────
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const cache = new Map(); // key: villaSlug → { data, fetchedAt }

/**
 * Format a Date to "YYYY-MM-DD" in local timezone.
 */
function toDateStr(d) {
  const date = new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Fetch and parse an iCal feed, extracting VEVENT blocked date ranges.
 */
async function fetchBlockedDates(icalUrl) {
  const events = await ical.async.fromURL(icalUrl);

  const blockedDates = Object.values(events)
    .filter((event) => event.type === "VEVENT")
    .map((event) => ({
      start: toDateStr(event.start),
      end: toDateStr(event.end),
      summary: event.summary || "Booked",
    }))
    .filter((range) => {
      // Only include future/current bookings (not past ones older than 30 days)
      const endDate = new Date(range.end);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return endDate >= thirtyDaysAgo;
    });

  return blockedDates;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const villaSlug = searchParams.get("villa");

    if (!villaSlug) {
      return NextResponse.json(
        { error: "Missing 'villa' query parameter" },
        { status: 400 }
      );
    }

    const icalUrl = ICAL_URLS[villaSlug];

    // If no iCal URL is configured, return empty (graceful fallback)
    if (!icalUrl) {
      return NextResponse.json({ blockedDates: [], source: "none" });
    }

    // Check cache
    const cached = cache.get(villaSlug);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({
        blockedDates: cached.data,
        source: "cache",
        cachedAt: new Date(cached.fetchedAt).toISOString(),
      });
    }

    // Fetch fresh data from Ekostay iCal
    const blockedDates = await fetchBlockedDates(icalUrl);

    // Update cache
    cache.set(villaSlug, { data: blockedDates, fetchedAt: Date.now() });

    return NextResponse.json({
      blockedDates,
      source: "fresh",
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Availability API error:", error);

    // If fetch fails, try returning stale cache as fallback
    const villaSlug = new URL(request.url).searchParams.get("villa");
    const stale = villaSlug ? cache.get(villaSlug) : null;
    if (stale) {
      return NextResponse.json({
        blockedDates: stale.data,
        source: "stale-cache",
        error: "Failed to refresh, returning cached data",
      });
    }

    // Complete failure — return empty so the site still works
    return NextResponse.json({
      blockedDates: [],
      source: "error",
      error: "Failed to fetch availability. Booking is still available.",
    });
  }
}
