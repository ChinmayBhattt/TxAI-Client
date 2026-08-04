import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFloat from "../components/ContactFloat";

export const metadata = {
  title: "About Us — Sachhin Gandhi | Staycation Villas",
  description:
    "Learn about Sachhin Gandhi, Founder of Chhutti Manao and Staycation Villas. 25+ years of experience in resort sales, hospitality management & vacation planning.",
};

export default function AboutUsPage() {
  const expertiseList = [
    { title: "Resort Sales & Operations", desc: "Decades of expertise optimizing resort performance and guest satisfaction." },
    { title: "Hospitality Management", desc: "Delivering end-to-end luxury standards across handpicked villas." },
    { title: "Vacation Planning", desc: "Curating bespoke itineraries tailored to individual and corporate getaways." },
  ];

  const keyStrengths = [
    "Strong industry connections for best rates & services",
    "Expertise in resort sales and operations",
    "Personalized vacation planning",
    "Proven track record of client satisfaction",
  ];

  return (
    <>
      <TopBanner />
      <Navbar />

      {/* Hero Header */}
      <section className="about-founder-hero">
        <div className="about-founder-hero-inner">
          <span className="about-badge">— ABOUT US</span>
          <h1 className="about-main-title">
            Meet the <em>Visionary</em> Behind <br /> Staycation Villas
          </h1>
          <p className="about-main-subtitle">
            Delivering exceptional vacation experiences through 25+ years of sales, marketing, and hospitality excellence.
          </p>
        </div>
      </section>

      {/* Founder Profile Card Section */}
      <section className="about-founder-profile">
        <div className="about-founder-container">
          <div className="founder-grid">
            {/* Image Column */}
            <div className="founder-image-col">
              <div className="founder-image-card">
                <img
                  src="/images/sachhin-gandhi.png"
                  alt="Sachhin Gandhi - Founder, Chhutti Manao"
                  className="founder-img"
                />
                <div className="founder-tag">
                  <span className="founder-tag-title">Sachhin Gandhi</span>
                  <span className="founder-tag-role">Founder, Chhutti Manao</span>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="founder-info-col">
              <div className="founder-header">
                <span className="founder-eyebrow">FOUNDER &amp; LEADER</span>
                <h2 className="founder-name">Sachhin Gandhi</h2>
                {/* <div className="founder-designation">Founder, Chhutti Manao</div> */}
              </div>

              {/* About Me Section */}
              <div className="founder-bio-box">
                <h3 className="founder-section-heading">About Me</h3>
                <p className="founder-bio-text">
                  With 25+ years of Sales and Marketing experience, I founded <strong>Chhutti Manao</strong> to deliver exceptional vacation experiences. Strong partnerships with major resorts and ownership of <strong>Staycation Villas</strong> enable me to offer exclusive deals. My expertise in resort sales and operations ensures seamless and memorable vacations.
                </p>
              </div>

              {/* Expertise Cards */}
              <div className="founder-expertise-section">
                <h3 className="founder-section-heading">Areas of Expertise</h3>
                <div className="expertise-cards-grid">
                  {expertiseList.map((item, index) => (
                    <div key={index} className="expertise-mini-card">
                      <div className="expertise-icon">✦</div>
                      <div>
                        <h4 className="expertise-title">{item.title}</h4>
                        <p className="expertise-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Strengths */}
              <div className="founder-strengths-section">
                <h3 className="founder-section-heading">Key Strengths</h3>
                <ul className="strengths-list">
                  {keyStrengths.map((strength, index) => (
                    <li key={index} className="strength-item">
                      <span className="strength-check">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regards & Quick Contact */}
              <div className="founder-contact-card">
                <div className="founder-regards">
                  <div className="regards-text">Regards,</div>
                  <div className="regards-name">Sachhin Gandhi</div>
                  <div className="regards-role">Founder, Chhutti Manao &amp; Staycation Villas</div>
                </div>

                <div className="founder-contact-links">
                  <a href="tel:+918082088000" className="founder-contact-btn phone-btn">
                    📞 8082088000
                  </a>
                  <a
                    href="https://www.chhuttimanao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="founder-contact-btn site-btn"
                  >
                    🌐 www.chhuttimanao.com
                  </a>
                </div>

                <div className="founder-socials">
                  <a
                    href="https://www.facebook.com/share/1Fybc2CeSa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn facebook"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/staycationvillas?utm_source=qr&igsh=MWg3ODlscHdwcmwyYg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn instagram"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
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
