"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { calculateStayPricing } from "../utils/pricing";

export default function BookingModal({
  isOpen,
  onClose,
  villa,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
}) {
  const [step, setStep] = useState(1); // 1: Guest Details, 2: QR Pay, 3: Confirmation
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync with sidebar values when modal opens
  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuests(initialGuests);
  }, [initialCheckIn, initialCheckOut, initialGuests]);

  // Calculate nights & prices (dynamic weekday/weekend)
  const pricing = calculateStayPricing(villa?.slug, checkIn, checkOut);
  const { nights, weekdayNights, weekendNights, weekdayRate, weekendRate, subtotal, hasBlackout } = pricing;
  const taxes = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + taxes;

  useEffect(() => {
    if (isOpen) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setGuestEmail(user.email || "");
          setGuestName(user.user_metadata?.full_name || "");
        }
      });
    } else {
      setStep(1);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !villa) return null;

  const generateBookingId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `BK-${random}`;
  };

  // ─── STEP 1 → Validate guest details, proceed to QR step ───
  const handleProceedToQR = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setError("Please fill in all guest details.");
      return;
    }
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end <= start) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setError("");
    const newBookingId = generateBookingId();
    setBookingId(newBookingId);
    setStep(2); // Go to QR payment step
  };

  // ─── Send booking details to owner via WhatsApp ───
  const notifyOwnerWhatsApp = (bId) => {
    const ownerPhone = "918082088000";
    const message = `*NEW BOOKING ALERT*

- *Booking ID:* ${bId}
- *Villa:* ${villa.name}
- *Location:* ${villa.location}

- *Check-In:* ${checkIn}
- *Check-Out:* ${checkOut}
- *Guests:* ${guests}

- *Guest Name:* ${guestName}
- *Email:* ${guestEmail}
- *Phone:* ${guestPhone}

- *Total Amount:* ₹${totalAmount.toLocaleString("en-IN")}
- *Payment Method:* UPI QR
- *Booked At:* ${new Date().toLocaleString("en-IN")}

Please verify payment and confirm.

This is tentative booking Final confirmation shall be given within next 3 hours post verification of payments and availability

Bookings once made cannot be cancelled 
No show no refund
3% credit card charges apply`;

    const waUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // ─── STEP 2 → User clicked "I have paid" — save booking & confirm ───
  const handleConfirmPayment = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from("bookings").insert([{
        booking_id: bookingId,
        villa_name: villa.name,
        villa_slug: villa.slug,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        total_amount: totalAmount,
        payment_method: "UPI QR",
        status: "confirmed",
        user_id: user ? user.id : null,
        created_at: new Date().toISOString(),
      }]);

      // Auto-download receipt for the user
      setTimeout(() => downloadReceipt(), 500);

      // Send booking details to owner via WhatsApp
      notifyOwnerWhatsApp(bookingId);

      setStep(3); // Confirmation screen
    } catch (err) {
      setError("Something went wrong saving your booking. Please try again.");
      console.error("Booking save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    const content = `
==================================================
           STAYCATION VILLAS — RECEIPT
==================================================
Booking ID:       ${bookingId}
Date:             ${new Date().toLocaleDateString("en-IN")}
Status:           ✅ CONFIRMED
--------------------------------------------------
PROPERTY
Villa:            ${villa.name}
Location:         ${villa.location}
Check-In:         ${checkIn}  (2:00 PM)
Check-Out:        ${checkOut}  (11:00 AM)
Nights:           ${nights}
Guests:           ${guests}
--------------------------------------------------
GUEST
Name:             ${guestName}
Email:            ${guestEmail}
Phone:            ${guestPhone}
--------------------------------------------------
PAYMENT BREAKDOWN${weekdayNights > 0 ? `\nWeekday Nights:   ₹${(weekdayRate * weekdayNights).toLocaleString("en-IN")}  (${weekdayNights} × ₹${weekdayRate.toLocaleString("en-IN")})` : ""}${weekendNights > 0 ? `\nWeekend Nights:   ₹${(weekendRate * weekendNights).toLocaleString("en-IN")}  (${weekendNights} × ₹${weekendRate.toLocaleString("en-IN")})` : ""}
Subtotal:         ₹${subtotal.toLocaleString("en-IN")}
GST (18%):        ₹${taxes.toLocaleString("en-IN")}
                  ────────────
TOTAL PAID:       ₹${totalAmount.toLocaleString("en-IN")}
Payment Method:   UPI QR
==================================================
Thank you for choosing Staycation Villas!
Support:  ‪+91 80820 88000‬
==================================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bm-backdrop" onClick={onClose}>
      <div className="bm-card" onClick={(e) => e.stopPropagation()}>
        <button className="bm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* ─── STEP 1: GUEST DETAILS ─── */}
        {step === 1 && (
          <div>
            <div className="bm-header">
              <span className="bm-subtitle">BOOKING CHECKOUT</span>
              <h2 className="bm-title">{villa.name}</h2>
              <p className="bm-loc">📍 {villa.location}</p>
            </div>

            <form onSubmit={handleProceedToQR} className="bm-form">
              {error && <div className="bm-alert-error">{error}</div>}

              <div className="bm-row-2">
                <div className="bm-field">
                  <label>CHECK-IN</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="bm-field">
                  <label>CHECK-OUT</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bm-field">
                <label>GUESTS</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                >
                  {Array.from({ length: villa.maxGuests || 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bm-section-divider">Guest Information</div>

              <div className="bm-field">
                <label>FULL NAME</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>

              <div className="bm-row-2">
                <div className="bm-field">
                  <label>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="bm-field">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Live price summary */}
              <div className="bm-price-box">
                {hasBlackout && (
                  <div className="bm-blackout-warning">
                    ⚠️ Your selected dates include a holiday / long weekend.
                    Online booking is not available for these dates.
                    <br />
                    <a href={`tel:${villa.hostPhone}`} className="bm-blackout-cta">
                      📞 Call us for pricing & availability
                    </a>
                  </div>
                )}
                {!hasBlackout && (
                  <>
                    {weekdayNights > 0 && (
                      <div className="bm-price-row">
                        <span>₹{weekdayRate.toLocaleString("en-IN")} × {weekdayNights} weekday night{weekdayNights > 1 ? "s" : ""}</span>
                        <span>₹{(weekdayRate * weekdayNights).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {weekendNights > 0 && (
                      <div className="bm-price-row">
                        <span>₹{weekendRate.toLocaleString("en-IN")} × {weekendNights} weekend night{weekendNights > 1 ? "s" : ""}</span>
                        <span>₹{(weekendRate * weekendNights).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="bm-price-row">
                      <span>GST &amp; Taxes (18%)</span>
                      <span>₹{taxes.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="bm-price-divider" />
                    <div className="bm-price-total">
                      <span>Total Amount</span>
                      <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="bm-primary-btn"
                disabled={hasBlackout}
              >
                {hasBlackout
                  ? "CALL US FOR HOLIDAY PRICING"
                  : `PROCEED TO PAY ₹${totalAmount.toLocaleString("en-IN")} →`}
              </button>
            </form>
          </div>
        )}

        {/* ─── STEP 2: QR PAYMENT ─── */}
        {step === 2 && (
          <div>
            <div className="bm-header">
              <span className="bm-subtitle">STEP 2 OF 2</span>
              <h2 className="bm-title">Scan & Pay</h2>
              <p className="bm-loc">Scan the QR code below using any UPI app to complete your payment</p>
            </div>

            <div className="bm-qr-payment-section">
              {error && <div className="bm-alert-error">{error}</div>}

              {/* Amount highlight */}
              <div className="bm-qr-amount-highlight">
                <span className="bm-qr-amount-label">Amount to Pay</span>
                <span className="bm-qr-amount-value">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              {/* QR Code — only the QR image */}
              <div className="bm-qr-img-wrapper">
                <img
                  src="/images/sachiQR.jpeg"
                  alt="UPI Payment QR Code"
                  className="bm-qr-img"
                />
              </div>

              {/* UPI ID for manual entry */}
              <div className="bm-upi-id-box">
                <span className="bm-upi-id-label">UPI ID</span>
                <span className="bm-upi-id-value">9594578888@okbizaxis</span>
              </div>

              {/* Booking summary mini card */}
              <div className="bm-qr-summary">
                <div className="bm-qr-summary-row">
                  <span>Booking ID</span>
                  <strong>{bookingId}</strong>
                </div>
                <div className="bm-qr-summary-row">
                  <span>Villa</span>
                  <strong>{villa.name}</strong>
                </div>
                <div className="bm-qr-summary-row">
                  <span>Dates</span>
                  <strong>{checkIn} → {checkOut}</strong>
                </div>
                <div className="bm-qr-summary-row">
                  <span>Guest</span>
                  <strong>{guestName}</strong>
                </div>
              </div>

              {/* Confirm payment button */}
              <button
                type="button"
                className="bm-confirm-paid-btn"
                onClick={handleConfirmPayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="bm-spinner" /> CONFIRMING...
                  </>
                ) : (
                  "✅ I HAVE PAID"
                )}
              </button>

              <p className="bm-secure-note">
                🔒 After payment, click the button above to confirm your booking.
                <br />
                Your booking will be verified by our team.
              </p>

              <button
                type="button"
                className="bm-back-btn"
                onClick={() => setStep(1)}
              >
                ← BACK TO DETAILS
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: CONFIRMATION ─── */}
        {step === 3 && (
          <div className="bm-confirm-box">
            <div className="bm-check-icon">✓</div>
            <span className="bm-subtitle">BOOKING CONFIRMED</span>
            <h2 className="bm-title">Thank You!</h2>
            <p className="bm-confirm-note">
              Your booking has been confirmed. Our team will verify your payment shortly.
            </p>
            <div className="bm-booking-id-card">
              <small>BOOKING REFERENCE ID</small>
              <div className="bm-bid-text">{bookingId}</div>
            </div>

            <div className="bm-confirm-details">
              <div className="bm-confirm-row">
                <span>Property:</span>
                <strong>{villa.name}</strong>
              </div>
              <div className="bm-confirm-row">
                <span>Dates:</span>
                <strong>
                  {checkIn} → {checkOut} ({nights} Night{nights > 1 ? "s" : ""})
                </strong>
              </div>
              <div className="bm-confirm-row">
                <span>Guest:</span>
                <strong>{guestName}</strong>
              </div>
              <div className="bm-confirm-row">
                <span>Email:</span>
                <strong>{guestEmail}</strong>
              </div>
              <div className="bm-confirm-row">
                <span>Amount Paid:</span>
                <strong className="bm-highlight-green">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>
              </div>
              <div className="bm-confirm-row">
                <span>Payment:</span>
                <strong>UPI QR</strong>
              </div>
            </div>

            <div className="bm-confirm-actions">
              <button onClick={downloadReceipt} className="bm-receipt-btn">
                📄 DOWNLOAD RECEIPT
              </button>
              <button onClick={onClose} className="bm-done-btn">
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
