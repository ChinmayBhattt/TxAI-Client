export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-content">
          <div className="section-subtitle">Stay Connected</div>
          <h2 className="section-title">
            Never miss an <em>escape</em>
          </h2>
          <p className="newsletter-desc">
            Subscribe to get handpicked deals, new villa launches, and exclusive
            member-only offers delivered straight to your inbox.
          </p>
          <div className="newsletter-form">
            <div className="newsletter-input-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="newsletter-icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                aria-label="Email address"
              />
            </div>
            <button className="newsletter-btn">
              Subscribe
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
          <p className="newsletter-note">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
        <div className="newsletter-visual">
          <div className="newsletter-card">
            <div className="newsletter-card-icon">🏡</div>
            <div className="newsletter-card-title">New Villa Alert</div>
            <div className="newsletter-card-text">
              Sunset Haven, Goa — Now available for monsoon bookings
            </div>
          </div>
          <div className="newsletter-card">
            <div className="newsletter-card-icon">🎉</div>
            <div className="newsletter-card-title">Flash Sale</div>
            <div className="newsletter-card-text">
              40% off on all Lonavala villas — This weekend only
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
