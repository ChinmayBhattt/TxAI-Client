export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/images/footer-logo.png" alt="Staycation Villas Logo" className="footer-logo-img" />
            {/* <span>Staycation Villas</span> */}
          </div>
          <p className="footer-tagline"> </p>
          <p className="footer-desc">
            India&apos;s most trusted villa holiday brand. Handpicked stays
            across India, managed end-to-end for your perfect
            getaway.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/staycationvillas?utm_source=qr&igsh=MWg3ODlscHdwcmwyYg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1Fybc2CeSa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Destinations</h4>
          <ul className="footer-list">
            <li><a href="/villa/amora-villa">Amora Villa</a></li>
            <li><a href="/villa/vistara-villa">Vistara Villa</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="https://www.chhuttimanao.com" target="_blank" rel="noopener noreferrer">Membership</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-list">
            <li>
              <a href="tel:+918082088000">+91 80820 88000</a>
            </li>
            <li>
              <a href="tel:+9180820660000">+91 8082066000</a>
            </li>
            <li>
              <a href="tel:+919594578888">+91 9594578888</a>
            </li>
            <li>
              <a href="mailto:staycationvillas@gmail.com">staycationvillas@gmail.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Social Media</h4>
          <div className="footer-social-icons-grid">
            <a
              href="https://www.instagram.com/staycationvillas?utm_source=qr&igsh=MWg3ODlscHdwcmwyYg=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Instagram - Staycation Villas"
              aria-label="Instagram Staycation Villas"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/chhuttimanao7?utm_source=qr&igsh=bXd2dWxsM2xocjg0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Instagram - Chhutti Manao"
              aria-label="Instagram Chhutti Manao"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1Fybc2CeSa/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Facebook - Staycation Villas"
              aria-label="Facebook Staycation Villas"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/197PiNtUo3/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Facebook - Chhutti Manao"
              aria-label="Facebook Chhutti Manao"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
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
