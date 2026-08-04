/**
 * Dynamic pricing engine for Staycation Villas.
 *
 * Rates (per night):
 *   Weekdays (Sun–Thu check-in night): Vistara ₹11,000 | Amora ₹12,000
 *   Weekends (Fri–Sat check-in night): Vistara ₹18,000 | Amora ₹20,000
 *
 * Blackout dates — long weekends, Diwali, Christmas, New Year —
 * are flagged so the UI can show "Contact us for pricing".
 */

// ── Per-villa rate table ────────────────────────────────────────────────────
const RATES = {
  "vistara-villa": { weekday: 11000, weekend: 18000 },
  "amora-villa":   { weekday: 12000, weekend: 20000 },
};

// ── Blackout / blocked dates ────────────────────────────────────────────────
// Add or update entries each year.  Format: "YYYY-MM-DD"
const BLACKOUT_DATES = new Set([
  // Diwali 2026 (approx cluster)
  "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21",
  // Christmas 2026
  "2026-12-24", "2026-12-25", "2026-12-26",
  // New Year 2026-27
  "2026-12-31", "2027-01-01", "2027-01-02",

  // Long weekends 2026 (Republic Day, Holi, Independence Day, Gandhi Jayanti etc.)
  // Republic Day weekend
  "2026-01-24", "2026-01-25", "2026-01-26",
  // Holi weekend
  "2026-03-06", "2026-03-07", "2026-03-08",
  // Independence Day weekend
  "2026-08-14", "2026-08-15", "2026-08-16",
  // Gandhi Jayanti weekend
  "2026-10-01", "2026-10-02", "2026-10-03",
  // Dussehra long weekend
  "2026-10-10", "2026-10-11", "2026-10-12",

  // ── 2027 ──
  // Diwali 2027 (approx)
  "2027-11-05", "2027-11-06", "2027-11-07", "2027-11-08", "2027-11-09",
  // Christmas 2027
  "2027-12-24", "2027-12-25", "2027-12-26",
  // New Year 2027-28
  "2027-12-31", "2028-01-01", "2028-01-02",
  // Republic Day 2027
  "2027-01-25", "2027-01-26", "2027-01-27",
  // Holi 2027
  "2027-03-26", "2027-03-27", "2027-03-28",
  // Independence Day 2027
  "2027-08-14", "2027-08-15", "2027-08-16",
  // Gandhi Jayanti 2027
  "2027-10-01", "2027-10-02", "2027-10-03",
]);

/**
 * Format a Date to "YYYY-MM-DD".
 */
function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Check if a single date string falls on a weekend (Fri or Sat night).
 * The "night" of Friday means check-in date is Friday → day index 5.
 * Saturday night → day index 6.
 */
function isWeekendNight(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay(); // 0=Sun … 5=Fri 6=Sat
  return day === 5 || day === 6;
}

/**
 * Check if any night in the stay falls on a blackout date.
 * @param {string} checkInStr  "YYYY-MM-DD"
 * @param {string} checkOutStr "YYYY-MM-DD"
 * @returns {boolean}
 */
export function hasBlackoutDates(checkInStr, checkOutStr) {
  if (!checkInStr || !checkOutStr) return false;
  const start = new Date(checkInStr + "T00:00:00");
  const end = new Date(checkOutStr + "T00:00:00");
  const cur = new Date(start);
  while (cur < end) {
    if (BLACKOUT_DATES.has(toDateStr(cur))) return true;
    cur.setDate(cur.getDate() + 1);
  }
  return false;
}

/**
 * Get the list of blackout dates that fall within the stay.
 */
export function getBlackoutDatesInRange(checkInStr, checkOutStr) {
  if (!checkInStr || !checkOutStr) return [];
  const start = new Date(checkInStr + "T00:00:00");
  const end = new Date(checkOutStr + "T00:00:00");
  const cur = new Date(start);
  const hits = [];
  while (cur < end) {
    const ds = toDateStr(cur);
    if (BLACKOUT_DATES.has(ds)) hits.push(ds);
    cur.setDate(cur.getDate() + 1);
  }
  return hits;
}

/**
 * Calculate the total tariff for a stay.
 *
 * @param {string} villaSlug   "vistara-villa" | "amora-villa"
 * @param {string} checkInStr  "YYYY-MM-DD"
 * @param {string} checkOutStr "YYYY-MM-DD"
 * @returns {{ nights, weekdayNights, weekendNights, weekdayRate, weekendRate,
 *             subtotal, perNightBreakdown[], hasBlackout }}
 */
export function calculateStayPricing(villaSlug, checkInStr, checkOutStr) {
  const rates = RATES[villaSlug] || RATES["vistara-villa"];

  if (!checkInStr || !checkOutStr) {
    return {
      nights: 1,
      weekdayNights: 1,
      weekendNights: 0,
      weekdayRate: rates.weekday,
      weekendRate: rates.weekend,
      subtotal: rates.weekday,
      perNightBreakdown: [],
      hasBlackout: false,
    };
  }

  const start = new Date(checkInStr + "T00:00:00");
  const end = new Date(checkOutStr + "T00:00:00");

  if (end < start) {
    return {
      nights: 1,
      weekdayNights: 1,
      weekendNights: 0,
      weekdayRate: rates.weekday,
      weekendRate: rates.weekend,
      subtotal: rates.weekday,
      perNightBreakdown: [],
      hasBlackout: false,
    };
  }

  if (start.getTime() === end.getTime()) {
    const ds = toDateStr(start);
    const isWknd = isWeekendNight(ds);
    const rate = isWknd ? rates.weekend : rates.weekday;
    return {
      nights: 1,
      weekdayNights: isWknd ? 0 : 1,
      weekendNights: isWknd ? 1 : 0,
      weekdayRate: rates.weekday,
      weekendRate: rates.weekend,
      subtotal: rate,
      perNightBreakdown: [{ date: ds, isWeekend: isWknd, rate }],
      hasBlackout: BLACKOUT_DATES.has(ds),
    };
  }

  let weekdayNights = 0;
  let weekendNights = 0;
  let subtotal = 0;
  const breakdown = [];
  const cur = new Date(start);
  let hasBlackout = false;

  while (cur < end) {
    const ds = toDateStr(cur);
    if (BLACKOUT_DATES.has(ds)) hasBlackout = true;

    const isWknd = isWeekendNight(ds);
    const rate = isWknd ? rates.weekend : rates.weekday;
    subtotal += rate;
    breakdown.push({ date: ds, rate, isWeekend: isWknd });

    if (isWknd) weekendNights++;
    else weekdayNights++;

    cur.setDate(cur.getDate() + 1);
  }

  return {
    nights: weekdayNights + weekendNights,
    weekdayNights,
    weekendNights,
    weekdayRate: rates.weekday,
    weekendRate: rates.weekend,
    subtotal,
    perNightBreakdown: breakdown,
    hasBlackout,
  };
}
