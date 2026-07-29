"use client";

import { useState, useEffect } from "react";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
          <span>Handpicked Staycations · India</span>
        </div>

        <h1 className="hero-title">
          Where every stay
          <br />
          becomes <em>a story.</em>
        </h1>

        {/* Search bar */}
        <div className="search-bar">
          <div className="search-field">
            <div className="search-field-label">Destination</div>
            <div className="search-field-value">Ooty</div>
          </div>
          <div className="search-field">
            <div className="search-field-label">Check In — Out</div>
            <div className="search-field-value">Add dates</div>
          </div>
          <div className="search-field">
            <div className="search-field-label">Guests</div>
            <div className="search-field-value">Add guests</div>
          </div>
          <button className="search-btn">
            Search
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>

      {/* Promo card */}
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
      </div>

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
