"use client";

import { useState, useEffect, useRef } from "react";
import TopBanner from "../../components/TopBanner";
import Navbar from "../../components/Navbar";
import ContactFloat from "../../components/ContactFloat";
import BookingModal from "../../components/BookingModal";
import { calculateStayPricing } from "../../utils/pricing";
import { isVillaSaved, toggleSaveVilla } from "../../utils/savedVillas";

function StarRating({ rating, size = 16 }) {
  return (
    <span className="vd-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`vd-star ${i < Math.floor(rating) ? "filled" : ""}`}
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function VillaDetailClient({ villa }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Tags horizontal scroll ref
  const tagsRef = useRef(null);

  const scrollTags = (direction) => {
    if (tagsRef.current) {
      tagsRef.current.scrollBy({ left: direction, behavior: "smooth" });
    }
  };

  // Real-time booking state for sidebar
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    // Read URL search params from search bar redirect
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramCheckIn = params.get("checkIn");
      const paramCheckOut = params.get("checkOut");
      const paramGuests = params.get("guests");
      if (paramCheckIn) setCheckIn(paramCheckIn);
      if (paramCheckOut) setCheckOut(paramCheckOut);
      if (paramGuests) setGuests(parseInt(paramGuests, 10));
    }

    // Check if villa is saved
    setIsSaved(isVillaSaved(villa.slug));

    return () => window.removeEventListener("scroll", handleScroll);
  }, [villa.slug]);

  // Real-time Tariff calculations (dynamic weekday/weekend pricing)
  const pricing = calculateStayPricing(villa.slug, checkIn, checkOut);
  const { nights, weekdayNights, weekendNights, weekdayRate, weekendRate, subtotal, hasBlackout } = pricing;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;

  return (
    <>
      {/* Top Banner */}
      <TopBanner />

      {/* Navbar */}
      <Navbar />

      <main className="vd-page">
        {/* Title + Rating + Save */}
        <div className="vd-header">
          <div className="vd-title-save-row">
            <h1 className="vd-title">Staycation Villas - {villa.name}</h1>
            <button
              onClick={() => {
                const nowSaved = toggleSaveVilla(villa.slug);
                setIsSaved(nowSaved);
              }}
              className={`vd-save-btn ${isSaved ? "saved" : ""}`}
              title={isSaved ? "Remove from saved" : "Save to favorites"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? "#dc2626" : "none"} stroke={isSaved ? "#dc2626" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{isSaved ? "Saved" : "Save Villa"}</span>
            </button>
          </div>
          <div className="vd-rating-row">
            <StarRating rating={villa.rating} />
            <span className="vd-rating-number">{villa.rating}</span>
            <span className="vd-review-count">{villa.reviews} reviews</span>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="vd-gallery">
          <div className="vd-gallery-main">
            <img src={villa.images[0]} alt={`${villa.name} main`} />
          </div>
          <div className="vd-gallery-grid">
            {villa.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className={`vd-gallery-item ${i === 3 ? "vd-gallery-last" : ""}`}
              >
                <img src={img} alt={`${villa.name} photo ${i + 2}`} />
                {i === 3 && (
                  <div className="vd-gallery-more" onClick={() => setShowAllPhotos(true)}>
                    <span>+{villa.morePhotos}</span>
                    <small>more photos</small>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="vd-show-all-btn"
            onClick={() => setShowAllPhotos(!showAllPhotos)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Show all photos
          </button>
        </div>

        {/* Main Content + Sidebar */}
        <div className="vd-content-layout">
          {/* Left: Details */}
          <div className="vd-content-main">
            {/* Location */}
            <div className="vd-location-row">
              <h2 className="vd-location-title">{villa.location.toUpperCase()}</h2>
              <div className="vd-address">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d4874e" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                <span>{villa.address}</span>
              </div>
            </div>

            {/* Specs */}
            <div className="vd-specs">
              <div className="vd-spec-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M3 7v11M21 7v11M3 18h18M5 7h14a2 2 0 012 2v4H3V9a2 2 0 012-2z" />
                </svg>
                {villa.bhk} BHK
              </div>
              <div className="vd-spec-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
                {villa.maxGuests} Max Guests
              </div>
              <div className="vd-spec-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z" />
                  <path d="M6 12V5a2 2 0 012-2h1" />
                </svg>
                {villa.bath} Bath
              </div>
            </div>

            {/* Tags / Amenities Horizontal Scroll Slider */}
            <div className="vd-tags-wrapper">
              <button
                className="vd-tags-scroll-btn left"
                onClick={() => scrollTags(-280)}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <div className="vd-tags" ref={tagsRef}>
                {villa.tags.map((tag, i) => (
                  <div key={i} className="vd-tag">
                    <span className="vd-tag-icon">{tag.icon}</span>
                    <div className="vd-tag-content">
                      <div className="vd-tag-label">{tag.label}</div>
                      <div className="vd-tag-desc">{tag.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="vd-tags-scroll-btn right"
                onClick={() => scrollTags(280)}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>

            {/* Description */}
            <div className="vd-description">
              <h2 className="vd-desc-headline">{villa.headline}</h2>
              <p className="vd-desc-tagline">{villa.tagline}</p>
              {villa.description.map((p, i) => (
                <p key={i} className="vd-desc-para">{p}</p>
              ))}
            </div>

            {/* Amenities Section */}
            {villa.amenities && (
              <div className="vd-amenities-section">
                <h2 className="vd-section-heading">Amenities</h2>
                <div className="vd-amenities-grid">
                  {villa.amenities.map((item, i) => (
                    <div key={i} className="vd-amenity-item">
                      <span className="vd-amenity-icon">{item.icon}</span>
                      <span className="vd-amenity-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="vd-faq-section">
              <h2 className="vd-section-heading">FAQ</h2>
              <div className="vd-faq-intro">
                <div className="vd-faq-intro-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4874e" strokeWidth="1.5" width="20" height="20">
                    <path d="M9 12h6M9 16h6M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" />
                  </svg>
                  FAQ
                </div>
                <p>
                  Everything you need to know before you book — check-in, house
                  rules, cancellation and more.
                </p>
              </div>
              <div className="vd-faq-list">
                {villa.faq.map((item, i) => (
                  <div
                    key={i}
                    className={`vd-faq-item ${faqOpen === i ? "open" : ""}`}
                  >
                    <button
                      className="vd-faq-question"
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      {item.q}
                      <span className="vd-faq-arrow">
                        {faqOpen === i ? "−" : "+"}
                      </span>
                    </button>
                    {faqOpen === i && (
                      <div className="vd-faq-answer">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Experiences */}
            <div className="vd-experiences">
              <div className="vd-exp-subtitle">CURATED FOR YOUR STAY</div>
              <h2 className="section-title" style={{ marginBottom: "8px" }}>
                Make every moment <em>memorable</em>
              </h2>
              <p className="vd-exp-desc">
                Turn your villa stay into an occasion. From celebrations and live
                entertainment to outdoor adventure and seamless travel, our team
                can arrange curated add-ons — so the only thing left to plan is
                the memory.
              </p>

              <div className="vd-exp-label">MAKE IT SPECIAL</div>
              <h3 className="vd-exp-category">Celebrations &amp; Hospitality</h3>

              <div className="vd-exp-grid">
                {villa.experiences.map((exp, i) => (
                  <div key={i} className="vd-exp-card">
                    <div className="vd-exp-img-wrapper">
                      <img src={exp.image} alt={exp.name} />
                    </div>
                    <div className="vd-exp-name">{exp.name}</div>
                    <div className="vd-exp-price">From {exp.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="vd-reviews">
              <h2 className="vd-section-heading">Customer Reviews</h2>
              <div className="vd-reviews-summary">
                <div className="vd-reviews-score">
                  <span className="vd-reviews-big">{villa.rating}</span>
                  <div>
                    <StarRating rating={villa.rating} size={14} />
                    <div className="vd-reviews-count">
                      {villa.reviews} User Reviews &amp; {villa.rating} Ratings
                    </div>
                  </div>
                </div>
                <button className="vd-guest-photos-btn">
                  Guest photos ({villa.customerReviews.length})
                </button>
              </div>

              <div className="vd-reviews-list">
                {villa.customerReviews.map((rev, i) => (
                  <div key={i} className="vd-review-item">
                    <div className="vd-review-avatar">
                      {rev.name.charAt(0)}
                    </div>
                    <div className="vd-review-content">
                      <StarRating rating={rev.rating} size={14} />
                      {rev.text && <p className="vd-review-text">{rev.text}</p>}
                      <div className="vd-review-author">{rev.name}</div>
                      <div className="vd-review-date">{rev.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="vd-show-more-btn">
                Show More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Location Map */}
            <div className="vd-map-section">
              <h2 className="vd-section-heading">Location</h2>
              <div className="vd-map-wrapper">
                <iframe
                  src={villa.mapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${villa.name} location`}
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(villa.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vd-directions-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                GET DIRECTIONS
              </a>
            </div>
          </div>

          {/* Right: REAL-TIME INTERACTIVE BOOKING SIDEBAR */}
          <aside className="vd-sidebar">
            <div className="vd-booking-card">
              <p className="vd-booking-title">Pick your dates to see your total</p>

              <div className="vd-booking-sale">
                🎁 26% OFF - GETAWAY SALE
              </div>

              {/* Real-time Dates Picker */}
              <div className="vd-booking-dates vd-dates-interactive">
                <div className="vd-booking-field">
                  <div className="vd-booking-field-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div className="vd-input-wrap">
                    <div className="vd-field-label">CHECK IN</div>
                    <input
                      type="date"
                      className="vd-date-input"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                </div>
                <div className="vd-booking-divider" />
                <div className="vd-booking-field">
                  <div className="vd-booking-field-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div className="vd-input-wrap">
                    <div className="vd-field-label">CHECK OUT</div>
                    <input
                      type="date"
                      className="vd-date-input"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Guest Select */}
              <div className="vd-booking-guests vd-guests-interactive">
                <div className="vd-booking-field-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4874e" strokeWidth="1.5" width="18" height="18">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div className="vd-input-wrap">
                  <div className="vd-field-label">GUESTS</div>
                  <select
                    className="vd-guest-select"
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
              </div>

              {/* <button className="vd-special-offer-btn" onClick={() => setBookingModalOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                SWIPE FOR SPECIAL OFFER
              </button> */}

              {/* REAL-TIME TARIFF CALCULATOR BOX */}
              <div className="vd-tariff">
                <div className="vd-tariff-label">REAL-TIME TARIFF BREAKDOWN</div>

                {hasBlackout && (
                  <div className="vd-blackout-warning">
                    ⚠️ Selected dates include a holiday / long weekend.
                    Pricing is not available online.
                    <a href={`tel:${villa.hostPhone}`} className="vd-blackout-cta">Call us for rates →</a>
                  </div>
                )}

                {!hasBlackout && (
                  <div className="vd-tariff-calc-rows">
                    {weekdayNights > 0 && (
                      <div className="vd-calc-row">
                        <span>₹{weekdayRate.toLocaleString("en-IN")} × {weekdayNights} weekday night{weekdayNights > 1 ? "s" : ""}</span>
                        <span>₹{(weekdayRate * weekdayNights).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {weekendNights > 0 && (
                      <div className="vd-calc-row">
                        <span>₹{weekendRate.toLocaleString("en-IN")} × {weekendNights} weekend night{weekendNights > 1 ? "s" : ""}</span>
                        <span>₹{(weekendRate * weekendNights).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="vd-calc-row">
                      <span>GST &amp; Service Fee (18%)</span>
                      <span>₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="vd-calc-divider" />
                    <div className="vd-calc-total">
                      <span>Total Price</span>
                      <span className="vd-total-highlight">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}
              </div>

              <p className="vd-best-rate">
                You will find the best rates on our website. No discounts will
                be given on phone.
              </p>

              <button className="vd-book-btn" onClick={() => setBookingModalOpen(true)}>
                BOOK NOW — ₹{totalAmount.toLocaleString("en-IN")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <div className="vd-secure-payment">
                <div className="vd-secure-text">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="16" height="16">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                  100% safe and secure payments.
                </div>
                <div className="vd-payment-icons">
                  <span className="vd-payment-badge visa">Verified by VISA</span>
                  <span className="vd-payment-badge paypal">PayPal</span>
                  <span className="vd-payment-badge mc">MasterCard</span>
                  <span className="vd-payment-badge rupay">RuPay</span>
                </div>
                <div className="vd-payment-icons" style={{ marginTop: "6px" }}>
                  <span className="vd-payment-badge upi">UPI</span>
                </div>
              </div>

              <div className="vd-contact-host">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Contact Your Host{" "}
                <a href={`tel:${villa.hostPhone}`} className="vd-host-phone">
                  {villa.hostPhone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <ContactFloat />

      {/* Booking & Razorpay UPI Payment Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        villa={villa}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialGuests={guests}
      />
    </>
  );
}
