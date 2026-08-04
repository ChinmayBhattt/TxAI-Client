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

            {/* Email Us */}
            <div className="contact-card">
              <div className="contact-card-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card-label">EMAIL US</div>
              <a
                href="mailto:staycationvillas@gmail.com"
                className="contact-card-value"
                style={{ fontSize: "19px" }}
              >
                staycationvillas@gmail.com
              </a>
              <p className="contact-card-sub">
                Drop us an email for custom stays &amp; inquiries.
              </p>
              <a
                href="mailto:staycationvillas@gmail.com"
                className="contact-action-btn"
              >
                SEND EMAIL →
              </a>
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