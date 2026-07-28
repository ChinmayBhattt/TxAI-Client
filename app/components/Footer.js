export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo">Staycation Villas</div>
          <p className="footer-tagline">Click. Book. Holiday.</p>
          <p className="footer-desc">
            India&apos;s most trusted villa holiday brand. Handpicked stays
            across 18+ destinations, managed end-to-end for your perfect
            getaway.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Destinations</h4>
          <ul className="footer-list">
            <li><a href="#">Goa</a></li>
            <li><a href="#">Alibaug</a></li>
            <li><a href="#">Lonavala</a></li>
            <li><a href="#">Igatpuri</a></li>
            <li><a href="#">Karjat</a></li>
            <li><a href="#">Panchgani</a></li>
            <li><a href="#">Nashik</a></li>
            <li><a href="#">Ooty</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="/about-us">About Us (Our Story)</a></li>
            <li><a href="/ourteam">Our Team</a></li>
            <li><a href="/collections">Eko Gold</a></li>
            <li><a href="/collections">Eko Luxe</a></li>
            <li><a href="/ourteam">Careers</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-list">
            <li><a href="/contact">Help Centre</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
          <h4 className="footer-heading" style={{ marginTop: "24px" }}>Contact</h4>
          <ul className="footer-list">
            <li>
              <a href="tel:+918169019090">+91 8169019090</a>
            </li>
            <li>
              <a href="mailto:reservations@ekostay.com">reservations@ekostay.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © 2025 Staycation Villas. All rights reserved.
          </p>
          <div className="footer-payment">
            <span className="payment-label">We accept</span>
            <div className="payment-icons">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge">MC</span>
              <span className="payment-badge">UPI</span>
              <span className="payment-badge">GPay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
