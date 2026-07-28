"use client";

import { useState, useEffect, useRef } from "react";

const destinations = [
  { name: "Goa", count: 23, href: "#" },
  { name: "Alibaug", count: 41, href: "#" },
  { name: "Lonavala", count: 31, href: "#" },
  { name: "Igatpuri", count: 16, href: "#" },
  { name: "Karjat", count: 17, href: "#" },
  { name: "Panchgani", count: 7, href: "#" },
  { name: "Nashik", count: 9, href: "#" },
  { name: "Ooty", count: 5, href: "#" },
];

const collectionsLinks = [
  { name: "Mountain View Villas", href: "#" },
  { name: "Water View Villas", href: "#" },
  { name: "Hidden Gems", href: "#" },
  { name: "Senior Citizen Friendly", href: "#" },
  { name: "Couples Friendly", href: "#" },
  { name: "Kids Friendly", href: "#" },
];

const luxuryLinks = [
  { name: "Eko Gold — Signature", href: "#" },
  { name: "Eko Luxe — Ultra Luxury", href: "#" },
];

const featuredVillas = [
  { name: "Vistara Villa", location: "Igatpuri", image: "/images/vistara-hero.png", href: "/villa/vistara-villa" },
  { name: "Amora Villa", location: "Alibaug", image: "/images/amora-hero.png", href: "/villa/amora-villa" },
];

const aboutLinks = [
  { name: "Our Story", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Contact Us", href: "#" },
];

function Dropdown({ children, isOpen }) {
  return (
    <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
      {children}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <div className="navbar-brand">
        <a href="/" className="brand-name">
          Staycation Villas
        </a>
        <div className="brand-divider" />
        <span className="brand-tagline">Click. Book. Holiday.</span>
      </div>

      <div className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
        {/* Destinations */}
        <div className="nav-dropdown-wrapper">
          <button
            className="has-dropdown nav-link-btn"
            onClick={() => toggleDropdown("destinations")}
          >
            Destinations <span className="dropdown-arrow">▾</span>
          </button>
          <Dropdown isOpen={openDropdown === "destinations"}>
            <div className="dropdown-col dropdown-featured-only">
              <div className="dropdown-col-title">Featured Villas</div>
              {featuredVillas.map((v, i) => (
                <a key={i} href={v.href} className="dropdown-villa-card">
                  <img src={v.image} alt={v.name} className="dropdown-villa-img" />
                  <div>
                    <div className="dropdown-villa-name">{v.name}</div>
                    <div className="dropdown-villa-loc">{v.location}</div>
                  </div>
                </a>
              ))}
            </div>
          </Dropdown>
        </div>

        {/* Collections */}
        <div className="nav-dropdown-wrapper">
          <button
            className="has-dropdown nav-link-btn"
            onClick={() => toggleDropdown("collections")}
          >
            Collections <span className="dropdown-arrow">▾</span>
          </button>
          <Dropdown isOpen={openDropdown === "collections"}>
            <div className="dropdown-list">
              {collectionsLinks.map((c, i) => (
                <a key={i} href={c.href} className="dropdown-list-item">
                  {c.name}
                </a>
              ))}
            </div>
          </Dropdown>
        </div>

        {/* Luxury */}
        <div className="nav-dropdown-wrapper">
          <button
            className="has-dropdown nav-link-btn"
            onClick={() => toggleDropdown("luxury")}
          >
            Luxury <span className="dropdown-arrow">▾</span>
          </button>
          <Dropdown isOpen={openDropdown === "luxury"}>
            <div className="dropdown-list">
              {luxuryLinks.map((l, i) => (
                <a key={i} href={l.href} className="dropdown-list-item">
                  {l.name}
                </a>
              ))}
            </div>
          </Dropdown>
        </div>

        {/* About Us */}
        <div className="nav-dropdown-wrapper">
          <button
            className="has-dropdown nav-link-btn"
            onClick={() => toggleDropdown("about")}
          >
            About Us <span className="dropdown-arrow">▾</span>
          </button>
          <Dropdown isOpen={openDropdown === "about"}>
            <div className="dropdown-list">
              {aboutLinks.map((a, i) => (
                <a key={i} href={a.href} className="dropdown-list-item">
                  {a.name}
                </a>
              ))}
            </div>
          </Dropdown>
        </div>

        <a href="#">Partner With Us</a>
        <a href="#">Membership</a>
        <a href="#" className="btn-login">
          Login
        </a>
      </div>

      <button
        className="mobile-toggle"
        aria-label="Open menu"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
