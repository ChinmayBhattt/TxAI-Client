"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-brand">
        <a href="/" className="brand-name">
          EKOSTAY
        </a>
        <div className="brand-divider" />
        <span className="brand-tagline">Click. Book. Holiday.</span>
      </div>

      <div className="navbar-links">
        <a href="#" className="has-dropdown">
          Destinations <span className="dropdown-arrow">▾</span>
        </a>
        <a href="#" className="has-dropdown">
          Collections <span className="dropdown-arrow">▾</span>
        </a>
        <a href="#" className="has-dropdown">
          Luxury <span className="dropdown-arrow">▾</span>
        </a>
        <a href="#" className="has-dropdown">
          About Us <span className="dropdown-arrow">▾</span>
        </a>
        <a href="#">Partner With Us</a>
        <a href="#">Membership</a>
        <a href="#" className="btn-login">
          Login
        </a>
      </div>

      <button className="mobile-toggle" aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
