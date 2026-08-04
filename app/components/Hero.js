"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/hero-bg-1.png",
    alt: "Staycation Villa 1",
  },
  {
    image: "/images/hero-bg-2.png",
    alt: "Staycation Villa 2",
  },
];

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Search states
  const [selectedVilla, setSelectedVilla] = useState("amora-villa");
  const [checkIn, setCheckIn] = useState("2026-08-01");
  const [checkOut, setCheckOut] = useState("2026-08-03");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    router.push(
      `/villa/${selectedVilla}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className={`hero-bg-slide ${index === currentSlide ? "active" : ""}`}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Live guests badge */}
      <div className="live-badge">
        <span className="live-dot" />
        <strong>609</strong> guests checked in today
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-subtitle">
          <div className="hero-line" />
          <span>Stay Relax Refresh · India</span>
        </div>

        <h1 className="hero-title">
          Where every stay
          <br />
          becomes <em>a story.</em>
        </h1>

        {/* Search bar */}
        <div className="search-bar">
          <div className="search-field">
            <label className="search-field-label" htmlFor="hero-villa-select">Vila</label>
            <select
              id="hero-villa-select"
              className="search-select"
              value={selectedVilla}
              onChange={(e) => setSelectedVilla(e.target.value)}
            >
              <option value="amora-villa">Amora Villa</option>
              <option value="vistara-villa">Vistara Villa</option>
            </select>
          </div>

          <div className="search-field">
            <label className="search-field-label" htmlFor="hero-checkin">Check In — Out</label>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <input
                id="hero-checkin"
                type="date"
                className="search-date-input"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>–</span>
              <input
                type="date"
                className="search-date-input"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="search-field">
            <label className="search-field-label" htmlFor="hero-guests">Guests</label>
            <select
              id="hero-guests"
              className="search-select"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Promo card
      <div className="hero-promo">
        <div className="promo-badge">
          <span className="dot" />
          <span>EkGoa Offer</span>
        </div>
        <h3 className="promo-title">Early Booker Goa</h3>
        <p className="promo-desc">
          Avail 20% discount upto Rs. 5000 on minimum 3 nights booking if booked 10 days in advance
        </p>
        <div className="promo-code">
          <span>Code</span>
          <strong>EBGOA20</strong>
          <button className="copy-btn" aria-label="Copy code">
            📋
          </button>
        </div>
      </div> */}

      {/* Slider dots */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
