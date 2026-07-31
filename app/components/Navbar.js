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


const featuredVillas = [
  { name: "Vistara Villa", location: "Igatpuri", image: "/images/vistara-hero.png", href: "/villa/vistara-villa" },
  { name: "Amora Villa", location: "Alibaug", image: "/images/amora-hero.png", href: "/villa/amora-villa" },
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
          <a href="/" className="brand-link">
            <img src="/images/logo.png" alt="Staycation Villas Logo" className="brand-logo" />
            <span className="brand-name">Stay.Relax.Refresh</span>
          </a>
        </div>

        <div className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          <a href="/villa/vistara-villa">Vistara Villa</a>
          <a href="/villa/amora-villa">Amora Villa</a>

          <a href="/about-us">About Us</a>

          <a href="https://www.chhuttimanao.com">Membership</a>

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
                  <a href="/account" className="dropdown-list-item dropdown-account-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>My Account</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="dropdown-list-item dropdown-logout-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Log Out</span>
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
