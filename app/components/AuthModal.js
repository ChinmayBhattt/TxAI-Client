"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Successfully logged in!");
        if (onSuccess) onSuccess(data.user);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        if (data?.user?.identities?.length === 0) {
          setError("An account with this email already exists. Please login.");
        } else {
          setMessage(
            "Account created! Please check your email for a confirmation link."
          );
          if (onSuccess) onSuccess(data.user);
          setTimeout(() => {
            onClose();
          }, 2500);
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-logo">Staycation Villas</div>
          <h2 className="auth-modal-title">
            {mode === "login" ? "Welcome Back" : "Join Staycation Villas"}
          </h2>
          <p className="auth-modal-subtitle">
            {mode === "login"
              ? "Sign in to manage your bookings and saved stays."
              : "Create an account for exclusive member deals & easy bookings."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-modal-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              setError("");
              setMessage("");
            }}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => {
              setMode("signup");
              setError("");
              setMessage("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-alert auth-alert-error">{error}</div>}
          {message && <div className="auth-alert auth-alert-success">{message}</div>}

          {mode === "signup" && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Log In"
                : "Create Account"}
          </button>
        </form>

        <div className="auth-modal-footer">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setMessage("");
                }}
              >
                Sign up now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setMessage("");
                }}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
