"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ContactFloat from "../../components/ContactFloat";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <span className="gift-icon">🎁</span>
        <span className="sale-title">The Great Getaway Sale</span>
        <span className="sale-text">
          {" "}— Flat 26% Off On All Properties · Code:{" "}
          <span className="sale-code">GETAWAY26</span>
        </span>
      </div>

      {/* Navbar — dark theme for detail page */}
      <nav className={`navbar navbar-detail ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-brand">
          <a href="/" className="brand-name">Staycation Villas</a>
          <div className="brand-divider" />
          <span className="brand-tagline">Click. Book. Holiday.</span>
        </div>
        <div className="navbar-links">
          <a href="/#destinations" className="has-dropdown">
            Destinations <span className="dropdown-arrow">▾</span>
          </a>
          <a href="/#collections" className="has-dropdown">
            Collections <span className="dropdown-arrow">▾</span>
          </a>
          <a href="/#luxury" className="has-dropdown">
            Luxury <span className="dropdown-arrow">▾</span>
          </a>
          <a href="/#" className="has-dropdown">
            About Us <span className="dropdown-arrow">▾</span>
          </a>
          <a href="#">Partner With Us</a>
          <a href="#">Membership</a>
          <a href="#" className="btn-login">Login</a>
        </div>
      </nav>

      <main className="vd-page">
        {/* Title + Rating */}
        <div className="vd-header">
          <h1 className="vd-title">Staycation Villas - {villa.name}</h1>
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

            {/* Tags / Amenities */}
            <div className="vd-tags">
              {villa.tags.map((tag, i) => (
                <div key={i} className="vd-tag">
                  <span className="vd-tag-icon">{tag.icon}</span>
                  <div>
                    <div className="vd-tag-label">{tag.label}</div>
                    <div className="vd-tag-desc">{tag.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="vd-description">
              <h2 className="vd-desc-headline">{villa.headline}</h2>
              <p className="vd-desc-tagline">{villa.tagline}</p>
              {villa.description.map((p, i) => (
                <p key={i} className="vd-desc-para">{p}</p>
              ))}
            </div>

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

          {/* Right: Booking Sidebar */}
          <aside className="vd-sidebar">
            <div className="vd-booking-card">
              <p className="vd-booking-title">Pick your dates to see your total</p>

              <div className="vd-booking-sale">
                🎁 26% OFF - GETAWAY SALE
              </div>

              <div className="vd-booking-dates">
                <div className="vd-booking-field">
                  <div className="vd-booking-field-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                  <div>
                    <div className="vd-field-label">CHECK IN</div>
                    <div className="vd-field-value">Add date</div>
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
                  <div>
                    <div className="vd-field-label">CHECK OUT</div>
                    <div className="vd-field-value">Add date</div>
                  </div>
                </div>
              </div>

              <div className="vd-booking-guests">
                <div className="vd-booking-field-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4874e" strokeWidth="1.5" width="18" height="18">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="vd-field-label">GUESTS</div>
                  <div className="vd-field-value">Guest</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" className="vd-chevron">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <button className="vd-special-offer-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                SWIPE FOR SPECIAL OFFER
              </button>

              <div className="vd-tariff">
                <div className="vd-tariff-label">TARIFF</div>
                <p className="vd-tariff-desc">
                  Select your dates and guests to see the price breakdown.
                </p>
              </div>

              <p className="vd-best-rate">
                You will find the best rates on our website. No discounts will
                be given on phone.
              </p>

              <button className="vd-book-btn">
                BOOK NOW
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
    </>
  );
}
