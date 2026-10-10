"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { villaData } from "../data/villas";
import { getSavedVillas, toggleSaveVilla } from "../utils/savedVillas";

export default function AccountClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "bookings";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Saved villas state
  const [savedSlugs, setSavedSlugs] = useState([]);

  // Account form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["bookings", "saved", "profile"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadUserAndData() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        setFullName(user.user_metadata?.full_name || "");
        setPhone(user.user_metadata?.phone || "");
        setEmail(user.email || "");

        // Fetch bookings for logged-in user
        fetchUserBookings(user);
      }

      // Load saved villas
      setSavedSlugs(getSavedVillas());
      setLoading(false);
    }

    loadUserAndData();

    const handleSavedChange = () => {
      setSavedSlugs(getSavedVillas());
    };
    window.addEventListener("savedVillasChanged", handleSavedChange);
    return () => window.removeEventListener("savedVillasChanged", handleSavedChange);
  }, []);

  const fetchUserBookings = async (currentUser) => {
    setBookingsLoading(true);
    let allBookings = [];
    try {
      const local = JSON.parse(localStorage.getItem("staycation_bookings") || "[]");
      if (Array.isArray(local)) {
        allBookings = local.filter(
          (b) =>
            !currentUser?.email ||
            b.guest_email?.toLowerCase() === currentUser?.email?.toLowerCase()
        );
      }
    } catch (e) {
      // ignore
    }

    try {
      let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });

      if (currentUser?.id && currentUser?.email) {
        query = query.or(`user_id.eq.${currentUser.id},guest_email.eq.${currentUser.email}`);
      } else if (currentUser?.email) {
        query = query.eq("guest_email", currentUser.email);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const map = new Map();
        [...data, ...allBookings].forEach((b) => {
          if (b.booking_id && !map.has(b.booking_id)) map.set(b.booking_id, b);
        });
        setBookings(Array.from(map.values()));
        return;
      }
      setBookings(allBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings(allBookings);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleRemoveSaved = (slug) => {
    toggleSaveVilla(slug);
    setSavedSlugs(getSavedVillas());
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateMsg({ type: "", text: "" });

    if (newPassword && newPassword !== confirmPassword) {
      setUpdateMsg({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setUpdateMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setUpdateLoading(true);

    try {
      const updateData = {
        data: {
          full_name: fullName,
          phone: phone,
        },
      };

      if (newPassword) {
        updateData.password = newPassword;
      }

      const { error } = await supabase.auth.updateUser(updateData);
      if (error) throw error;

      setUpdateMsg({ type: "success", text: "Profile updated successfully!" });
      setNewPassword("");
      setConfirmPassword("");

      // Refresh current user state
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(updatedUser);
    } catch (err) {
      setUpdateMsg({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setUpdateLoading(false);
    }
  };

  const downloadReceipt = (b) => {
    const content = `
==================================================
           STAYCATION VILLAS — RECEIPT
==================================================
Booking ID:       ${b.booking_id}
Date:             ${new Date(b.created_at || Date.now()).toLocaleDateString("en-IN")}
Status:           ✅ ${b.status?.toUpperCase() || "CONFIRMED"}
--------------------------------------------------
PROPERTY
Villa:            ${b.villa_name}
Check-In:         ${b.check_in} (2:00 PM)
Check-Out:        ${b.check_out} (11:00 AM)
Guests:           ${b.guests}
--------------------------------------------------
GUEST DETAILS
Name:             ${b.guest_name}
Email:            ${b.guest_email}
Phone:            ${b.guest_phone || "N/A"}
--------------------------------------------------
PAYMENT
Total Amount:     ₹${Number(b.total_amount).toLocaleString("en-IN")}
Payment Method:   ${b.payment_method || "UPI QR"}${b.transaction_date ? `\nTransaction Date: ${b.transaction_date}` : ""}${b.utr ? `\nUTR / Ref No:     ${b.utr}` : ""}
==================================================
Thank you for choosing Staycation Villas!
Support:  ‪+91 80820 88000‬
==================================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${b.booking_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savedVillaObjects = savedSlugs
    .map((slug) => villaData[slug])
    .filter(Boolean);

  return (
    <div className="account-page-wrapper">
      <Navbar />

      <main className="account-container">
        {/* Profile Header */}
        <div className="account-header">
          <div className="account-avatar">
            {user?.user_metadata?.full_name
              ? user.user_metadata.full_name.charAt(0).toUpperCase()
              : user?.email
              ? user.email.charAt(0).toUpperCase()
              : "👤"}
          </div>
          <div className="account-header-info">
            <h1 className="account-title">
              {user?.user_metadata?.full_name || "My Account"}
            </h1>
            <p className="account-email">{user?.email || "Welcome back!"}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="account-tabs">
          <button
            className={`account-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>My Bookings ({bookings.length})</span>
          </button>
          <button
            className={`account-tab-btn ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Saved Villas ({savedVillaObjects.length})</span>
          </button>
          <button
            className={`account-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="account-content">
          {/* ─── TAB 1: MY BOOKINGS ─── */}
          {activeTab === "bookings" && (
            <div className="tab-pane">
              <div className="tab-header">
                <h2>My Bookings</h2>
                <p>View and manage all your villa reservations</p>
              </div>

              {bookingsLoading ? (
                <div className="account-loading">Loading your bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3>No bookings found</h3>
                  <p>You haven't made any villa reservations yet.</p>
                  <a href="/collections/mountain-view-villas" className="account-primary-btn">
                    Explore Villas
                  </a>
                </div>
              ) : (
                <div className="bookings-grid">
                  {bookings.map((b) => (
                    <div key={b.id || b.booking_id} className="booking-card">
                      <div className="booking-card-header">
                        <div>
                          <span className="booking-ref">ID: {b.booking_id}</span>
                          <h3 className="booking-villa-name">{b.villa_name}</h3>
                        </div>
                        <span className={`booking-status-badge ${b.status || "confirmed"}`}>
                          {b.status === "confirmed" ? "✓ Confirmed" : b.status || "Confirmed"}
                        </span>
                      </div>

                      <div className="booking-card-body">
                        <div className="booking-detail-row">
                          <span>Check-In</span>
                          <strong>{b.check_in} (2:00 PM)</strong>
                        </div>
                        <div className="booking-detail-row">
                          <span>Check-Out</span>
                          <strong>{b.check_out} (11:00 AM)</strong>
                        </div>
                        <div className="booking-detail-row">
                          <span>Guests</span>
                          <strong>{b.guests} Guests</strong>
                        </div>
                        <div className="booking-detail-row">
                          <span>Total Paid</span>
                          <strong className="booking-price">
                            ₹{Number(b.total_amount).toLocaleString("en-IN")}
                          </strong>
                        </div>
                        <div className="booking-detail-row">
                          <span>Payment Method</span>
                          <strong>{b.payment_method || "UPI QR"}</strong>
                        </div>
                        {b.utr && (
                          <div className="booking-detail-row">
                            <span>UTR / Ref No</span>
                            <strong style={{ fontFamily: "monospace" }}>{b.utr}</strong>
                          </div>
                        )}
                        {b.transaction_date && (
                          <div className="booking-detail-row">
                            <span>Txn Date</span>
                            <strong>{b.transaction_date}</strong>
                          </div>
                        )}
                      </div>

                      <div className="booking-card-footer">
                        <button
                          onClick={() => downloadReceipt(b)}
                          className="booking-receipt-btn"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px" }}>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          Download Receipt
                        </button>
                        {b.villa_slug && (
                          <a
                            href={`/villa/${b.villa_slug}`}
                            className="booking-view-villa-btn"
                          >
                            View Villa →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── TAB 2: SAVED VILLAS ─── */}
          {activeTab === "saved" && (
            <div className="tab-pane">
              <div className="tab-header">
                <h2>Saved Villas</h2>
                <p>Your favorite luxury stays saved for quick access</p>
              </div>

              {savedVillaObjects.length === 0 ? (
                <div className="account-empty-state">
                  <div className="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <h3>No saved villas</h3>
                  <p>You haven't saved any villas to your wishlist yet.</p>
                  <a href="/" className="account-primary-btn">
                    Browse Villas
                  </a>
                </div>
              ) : (
                <div className="saved-villas-grid">
                  {savedVillaObjects.map((villa) => (
                    <div key={villa.slug} className="saved-villa-card">
                      <div className="saved-villa-img-wrapper">
                        <img
                          src={villa.images[0]}
                          alt={villa.name}
                          className="saved-villa-img"
                        />
                        <button
                          onClick={() => handleRemoveSaved(villa.slug)}
                          className="saved-villa-remove-btn"
                          title="Remove from saved"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                      </div>

                      <div className="saved-villa-content">
                        <span className="saved-villa-location">📍 {villa.location}</span>
                        <h3 className="saved-villa-title">{villa.name}</h3>
                        <p className="saved-villa-specs">
                          {villa.bhk} BHK • Up to {villa.maxGuests} Guests • Private Pool
                        </p>

                        <div className="saved-villa-footer">
                          <div className="saved-villa-price">
                            <span className="price-val">{villa.price}</span>
                            <span className="price-lbl">/ night</span>
                          </div>
                          <a
                            href={`/villa/${villa.slug}`}
                            className="saved-villa-cta"
                          >
                            View Details →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── TAB 3: ACCOUNT SETTINGS ─── */}
          {activeTab === "profile" && (
            <div className="tab-pane">
              <div className="tab-header">
                <h2>Account Settings</h2>
                <p>Update your personal details and password</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="account-form">
                {updateMsg.text && (
                  <div
                    className={`account-alert ${
                      updateMsg.type === "success" ? "alert-success" : "alert-error"
                    }`}
                  >
                    {updateMsg.text}
                  </div>
                )}

                <div className="form-group">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="disabled-input"
                    />
                    <small className="field-hint">Email address cannot be changed</small>
                  </div>

                  <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-divider">Change Password (Optional)</div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>NEW PASSWORD</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep unchanged"
                      minLength={6}
                    />
                  </div>

                  <div className="form-group">
                    <label>CONFIRM NEW PASSWORD</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      minLength={6}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="account-save-btn"
                  disabled={updateLoading}
                >
                  {updateLoading ? "SAVING CHANGES..." : "SAVE PROFILE CHANGES"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
