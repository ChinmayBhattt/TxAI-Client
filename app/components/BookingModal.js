"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BookingModal({
  isOpen,
  onClose,
  villa,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
}) {
  const [step, setStep] = useState(1); // 1: Guest Details, 2: Confirmation
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentId, setPaymentId] = useState("");

  // Sync with sidebar values when modal opens
  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuests(initialGuests);
  }, [initialCheckIn, initialCheckOut, initialGuests]);

  // Calculate nights & prices
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const baseRate = parseInt(villa?.price?.replace(/[^0-9]/g, "") || "22000", 10);
  const subtotal = baseRate * nights;
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
      setPaymentId("");
    }
  }, [isOpen]);

  if (!isOpen || !villa) return null;

  const generateBookingId = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `BK-${random}`;
  };

  // ─── STEP 1 → Validate details, then launch Razorpay immediately ───
  const handlePayNow = async (e) => {
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
    setLoading(true);

    const newBookingId = generateBookingId();
    setBookingId(newBookingId);

    try {
      // 1. Create Razorpay order on server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          bookingId: newBookingId,
          villaName: villa.name,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 2. Open Razorpay Checkout — UPI only
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Staycation Villas",
        description: `Booking ${newBookingId} – ${villa.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: guestName,
          email: guestEmail,
          contact: guestPhone,
        },
        notes: {
          bookingId: newBookingId,
          villaName: villa.name,
          checkIn,
          checkOut,
        },
        theme: { color: "#d4874e" },

        // ── On successful payment ──
        handler: async function (response) {
          // response.razorpay_payment_id is set ONLY when Razorpay
          // actually captured the payment on their end.
          const rpPaymentId = response.razorpay_payment_id;
          setPaymentId(rpPaymentId);

          // Save booking in Supabase
          try {
            const { data: { user } } = await supabase.auth.getUser();

            await supabase.from("bookings").insert([{
              booking_id: newBookingId,
              villa_name: villa.name,
              villa_slug: villa.slug,
              check_in: checkIn,
              check_out: checkOut,
              guests,
              guest_name: guestName,
              guest_email: guestEmail,
              guest_phone: guestPhone,
              total_amount: totalAmount,
              payment_method: "Razorpay UPI",
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: rpPaymentId,
              status: "confirmed",
              user_id: user ? user.id : null,
              created_at: new Date().toISOString(),
            }]);
          } catch (dbErr) {
            console.log("DB write fallback:", dbErr);
          }

          // Move to confirmation screen
          setStep(2);
          setLoading(false);
        },

        // ── User dismissed checkout without paying ──
        modal: {
          ondismiss: function () {
            setLoading(false);
            // Booking stays pending — nothing is confirmed
          },
        },
      };

      const rzp = new window.Razorpay(options);

      // Handle payment failure from gateway
      rzp.on("payment.failed", function (response) {
        setError(
          response.error?.description ||
            "Payment failed. Please try again."
        );
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
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
PAYMENT BREAKDOWN
Base Rate:        ₹${subtotal.toLocaleString("en-IN")}  (${nights} × ₹${baseRate.toLocaleString("en-IN")})
GST (18%):        ₹${taxes.toLocaleString("en-IN")}
                  ────────────
TOTAL PAID:       ₹${totalAmount.toLocaleString("en-IN")}
Payment Ref:      ${paymentId}
Gateway:          Razorpay
==================================================
Thank you for choosing Staycation Villas!
Support: +91 8169019090 | reservations@ekostay.com
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

        {/* ─── STEP 1: DETAILS + PAY ─── */}
        {step === 1 && (
          <div>
            <div className="bm-header">
              <span className="bm-subtitle">BOOKING CHECKOUT</span>
              <h2 className="bm-title">{villa.name}</h2>
              <p className="bm-loc">📍 {villa.location}</p>
            </div>

            <form onSubmit={handlePayNow} className="bm-form">
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
                <div className="bm-price-row">
                  <span>₹{baseRate.toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="bm-price-row">
                  <span>GST &amp; Taxes (18%)</span>
                  <span>₹{taxes.toLocaleString("en-IN")}</span>
                </div>
                <div className="bm-price-divider" />
                <div className="bm-price-total">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* QR Code + UPI Apps */}
              <div className="bm-qr-section">
                <div className="bm-qr-or-line">
                  <span>SCAN &amp; PAY VIA UPI</span>
                </div>
                <div className="bm-qr-img-wrapper">
                  <img
                    src="/images/qr.jpeg"
                    alt="UPI Payment QR Code"
                    className="bm-qr-img"
                  />
                </div>
                <p className="bm-qr-amount-note">
                  Amount: <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                </p>
                <div className="bm-upi-apps-icons">
                  <span className="upi-app-badge gpay">GPay</span>
                  <span className="upi-app-badge phonepe">PhonePe</span>
                  <span className="upi-app-badge paytm">Paytm</span>
                  <span className="upi-app-badge bhim">BHIM</span>
                </div>
              </div>

              <div className="bm-qr-or-line">
                <span>OR PAY VIA GATEWAY</span>
              </div>

              <button
                type="submit"
                className="bm-primary-btn"
                disabled={loading}
              >
                {loading
                  ? "OPENING PAYMENT GATEWAY..."
                  : `PAY ₹${totalAmount.toLocaleString("en-IN")} WITH RAZORPAY →`}
              </button>

              <p className="bm-secure-note">
                🔒 Secured by Razorpay · UPI / Cards / Netbanking
              </p>
            </form>
          </div>
        )}

        {/* ─── STEP 2: CONFIRMATION (only after real payment) ─── */}
        {step === 2 && (
          <div className="bm-confirm-box">
            <div className="bm-check-icon">✓</div>
            <span className="bm-subtitle">PAYMENT VERIFIED &amp; CONFIRMED</span>
            <h2 className="bm-title">Booking Confirmed!</h2>
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
                <span>Amount Paid:</span>
                <strong className="bm-highlight-green">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>
              </div>
              {paymentId && (
                <div className="bm-confirm-row">
                  <span>Payment Ref:</span>
                  <strong style={{ fontSize: 11, wordBreak: "break-all" }}>
                    {paymentId}
                  </strong>
                </div>
              )}
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
