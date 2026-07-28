"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuthModal from "./AuthModal";

const collectionsLinks = [
  { name: "Mountain View Villas", href: "/collections/mountain-view-villas" },
  { name: "Water View Villas", href: "/collections/water-view-villas" },
  { name: "Hidden Gems", href: "/collections/hidden-gems" },
  { name: "Senior Citizen Friendly", href: "/collections/senior-citizen-friendly" },
  { name: "Couples Friendly", href: "/collections/couples-friendly" },
  { name: "Kids Friendly", href: "/collections/kids-friendly" },
];

const luxuryLinks = [
  { name: "Eko Gold — Signature", href: "/collections" },
  { name: "Eko Luxe — Ultra Luxury", href: "/collections" },
];

const featuredVillas = [
  { name: "Vistara Villa", location: "Igatpuri", image: "/images/vistara-hero.png", href: "/villa/vistara-villa" },
  { name: "Amora Villa", location: "Alibaug", image: "/images/amora-hero.png", href: "/villa/amora-villa" },
];

const aboutLinks = [
  { name: "Our Story", href: "/about-us" },
  { name: "Our Team", href: "/ourteam" },
  { name: "Careers", href: "/ourteam" },
  { name: "Contact Us", href: "/contact" },
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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  return (
    <>
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

          {user ? (
            <div className="nav-dropdown-wrapper">
              <button
                className="btn-user-profile"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="user-avatar-circle">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </span>
                <span className="user-name-text">{getUserDisplayName()}</span>
                <span className="dropdown-arrow">▾</span>
              </button>
              <Dropdown isOpen={userMenuOpen}>
                <div className="dropdown-list">
                  <div className="user-email-header">{user.email}</div>
                  <a href="#" className="dropdown-list-item">
                    My Bookings
                  </a>
                  <a href="#" className="dropdown-list-item">
                    Saved Villas
                  </a>
                  <button
                    onClick={handleLogout}
                    className="dropdown-list-item dropdown-logout-btn"
                  >
                    Log Out
                  </button>
                </div>
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="btn-login"
            >
              Login
            </button>
          )}
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

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </>
  );
}
