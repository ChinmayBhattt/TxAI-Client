import crypto from "crypto";
import fs from "fs";
import path from "path";

const SECRET = process.env.BOOKING_ACTION_SECRET || "staycation-villas-owner-secret-key-2026";
const STATUS_FILE = path.join(process.cwd(), "app/data/booking_action_status.json");

/**
 * Creates a signed, tamper-proof URL token containing booking details.
 */
export function createBookingToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

/**
 * Verifies a token and returns the parsed booking details, or null if invalid.
 */
export function verifyBookingToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  if (expectedSignature !== signature) return null;

  try {
    const jsonStr = Buffer.from(data, "base64url").toString("utf-8");
    return JSON.parse(jsonStr);
  } catch (err) {
    return null;
  }
}

/**
 * Reads the recorded action status for a booking ID (e.g., 'approved' or 'rejected').
 */
export function getBookingActionStatus(bookingId) {
  try {
    if (!fs.existsSync(STATUS_FILE)) return null;
    const content = fs.readFileSync(STATUS_FILE, "utf-8");
    const json = JSON.parse(content || "{}");
    return json[bookingId] || null;
  } catch (e) {
    return null;
  }
}

/**
 * Records an action status for a booking ID to prevent duplicate actions.
 */
export function recordBookingActionStatus(bookingId, status, actionData = {}) {
  try {
    let json = {};
    if (fs.existsSync(STATUS_FILE)) {
      const content = fs.readFileSync(STATUS_FILE, "utf-8");
      json = JSON.parse(content || "{}");
    }
    json[bookingId] = {
      status,
      timestamp: new Date().toISOString(),
      ...actionData,
    };
    fs.writeFileSync(STATUS_FILE, JSON.stringify(json, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not save booking action status file:", e);
  }
}
