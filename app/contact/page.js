import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFloat from "../components/ContactFloat";

export const metadata = {
  title: "Contact Us |  ",
  description:
    "Get in touch with   villa specialists. Call  ‪+91 80820 88000‬ or email reservations@ .com.",
};

export default function ContactPage() {
  return (
    <>
      <TopBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-subtitle">— CONTACT   —</div>
          <h1 className="contact-hero-title">
            Let&apos;s plan your <em>next escape,</em>
            <br />
            together.
          </h1>
          <p className="contact-hero-desc">
            Whether you&apos;re booking a weekend villa for two, a large group
            getaway, or a corporate offsite, our villa specialists know every
            property across Goa, Lonavala, Alibaug and 9+ destinations — and
            they reply within a few hours, 7 days a week. Tell us what you&apos;re
            looking for and we&apos;ll match you with the right stay.
          </p>

          <div className="contact-perks-row">
            <div className="contact-perk">
              <span className="contact-perk-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <div>
                <strong>Replies within a few hours</strong>
                <p>Every day of the week, including weekends</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="contact-perk-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <div>
                <strong>Managed villas</strong>
                <p>One team, every destination across India</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="contact-perk-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <div>
                <strong>Best price, booked direct</strong>
                <p>Plus Airpay-secured payments on every stay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reach Us Cards */}
      <section className="contact-reach-section">
        <div className="contact-reach-inner">
          <div className="section-subtitle" style={{ textAlign: "center" }}>
            — REACH US —
          </div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "50px" }}>
            Prefer to talk? <em>Reach us your way.</em>
          </h2>

          <div className="contact-cards-grid">
            {/* Phone */}
            <div className="contact-card">
              <div className="contact-card-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-card-label">CALL US</div>
              <a href="tel:+918082088000" className="contact-card-value">
                +91 80820 88000
              </a>
              <p className="contact-card-sub">
                Speak to a villa specialist, 7 days a week.
              </p>
              <a href="tel:+918082088000" className="contact-action-btn">
                CALL NOW →
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div className="contact-card-icon-circle whatsapp-circle">
                <svg viewBox="0 0 24 24" fill="#25D366" width="26" height="26">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
              <div className="contact-card-label">WHATSAPP</div>
              <a
                href="https://wa.me/918082088000"
                target="_blank"
                rel="noreferrer"
                className="contact-card-value"
              >
                +91 80820 88000
              </a>
              <p className="contact-card-sub">
                Quick questions? Chat with us instantly.
              </p>
              <a
                href="https://wa.me/918082088000"
                target="_blank"
                rel="noreferrer"
                className="contact-action-btn"
              >
                OPEN CHAT →
              </a>
            </div>

            {/* Founder Direct Contact Card */}
            <div className="contact-card founder-card-clean">
              <div className="contact-card-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="contact-card-label">DIRECT FOUNDER CONTACT</div>
              <div className="contact-card-value" style={{ fontSize: "22px" }}>
                Sachhin Gandhi
              </div>
              <p className="contact-card-sub">
                Founder, Staycation Villas &amp; Chhutti Manao
              </p>

              <div className="founder-clean-details">
                <a href="mailto:sachingandhi0712@gmail.com" className="founder-clean-email">
                  ✉️ sachingandhi0712@gmail.com
                </a>

                <div className="founder-clean-phones">
                  <a href="tel:+918082088000">📞 +91 80820 88000</a>
                  <a href="tel:+918082066000">📞 +91 8082066000</a>
                  <a href="tel:+919594578888">📞 +91 9594578888</a>
                </div>
              </div>

              <div className="founder-clean-socials">
                <a
                  href="https://www.facebook.com/share/1BtFXTFzF5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/sach_4ever"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sachhin-gandhi-693b3035/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactFloat />
    </>
  );
}

// https://www.instagram.com/chhuttimanao7?utm_source=qr&igsh=bXd2dWxsM2xocjg0

// https://www.instagram.com/staycationvillas?utm_source=qr&igsh=MWg3ODlscHdwcmwyYg==

// https://www.facebook.com/share/197PiNtUo3/

// https://www.facebook.com/share/1Fybc2CeSa/