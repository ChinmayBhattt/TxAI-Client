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
              <span className="contact-perk-icon">🕒</span>
              <div>
                <strong>Replies within a few hours</strong>
                <p>Every day of the week, including weekends</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="contact-perk-icon">🏡</span>
              <div>
                <strong> managed villas</strong>
                <p>One team, every destination across India</p>
              </div>
            </div>
            <div className="contact-perk">
              <span className="contact-perk-icon">🛡️</span>
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
              <div className="contact-card-icon-circle">📞</div>
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
              <div className="contact-card-icon-circle">💬</div>
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

            {/* Website */}
            <div className="contact-card">
              <div className="contact-card-icon-circle">🌐</div>
              <div className="contact-card-label">VISIT WEBSITE</div>
              <a
                href="https://www.chhuttimanao.com"
                target="_blank"
                rel="noreferrer"
                className="contact-card-value"
              >
                www.chhuttimanao.com
              </a>
              <p className="contact-card-sub">
                Explore our full vacation &amp; resort portfolio.
              </p>
              <a
                href="https://www.chhuttimanao.com"
                target="_blank"
                rel="noreferrer"
                className="contact-action-btn"
              >
                VISIT SITE →
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