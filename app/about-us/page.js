import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFloat from "../components/ContactFloat";

export const metadata = {
  title: "Our Story | EkoStay",
  description:
    "From a single home to 170+ handpicked villas across India — here's how EkoStay came to be.",
};

export default function AboutUsPage() {
  return (
    <>
      <TopBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-subtitle">— OUR STORY</div>
          <h1 className="about-hero-title">
            Every stay begins
            <br />
            with a <em>story.</em>
          </h1>
          <p className="about-hero-desc">
            From a single home to 170+ handpicked villas across India — here&apos;s
            how EkoStay came to be.
          </p>
          <div className="about-scroll-indicator">
            <span>SCROLL TO DISCOVER</span>
            <div className="scroll-arrow-circle">↓</div>
          </div>
        </div>
      </section>

      {/* Welcome / Philosophy Section */}
      <section className="about-welcome">
        <div className="about-welcome-inner">
          <div className="about-welcome-img-wrapper">
            <img
              src="/images/hero-bg.png"
              alt="Luxury EkoStay villa view"
              className="about-welcome-img"
            />
            <div className="about-welcome-badge">✦ EST. 2018</div>
          </div>
          <div className="about-welcome-text">
            <div className="section-subtitle">— WELCOME TO EKOSTAY</div>
            <h2 className="about-heading">
              Homes with character,
              <br />
              stays without compromise.
            </h2>
            <p className="about-para">
              Today, EkoStay is one of India&apos;s leading names in the Short-term
              Rental and Homestay Industry — with 160+ handpicked villas across
              20 destinations in Maharashtra, Goa, Tamil Nadu, and Uttarakhand.
              From premium villas in Ooty, charming villas in Coonoor, and
              private villas in Kodaikanal to luxurious villas in Goa, villas in
              North Goa, villas in Candolim, villas in Anjuna, and villas in
              Vagator Goa, our collection is designed for every kind of getaway.
            </p>
            <p className="about-para">
              Closer to the city, guests can discover some of the most sought-after
              villas near Mumbai, including luxury villas near Mumbai, villas in
              Lonavala with pool, villas in Alibaug, villas in Karjat, villas in
              Igatpuri, villas in Panchgani, villas in Mahabaleshwar, villas in
              Nashik, private villas in Panvel, and scenic retreats in Mussoorie.
            </p>
          </div>
        </div>
      </section>

      {/* Journey / Timeline Section */}
      <section className="about-journey">
        <div className="about-journey-inner">
          <div className="section-subtitle" style={{ textAlign: "center" }}>
            — EST. 2018 —
          </div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px" }}>
            Our journey <em>so far...</em>
          </h2>
          <p className="about-journey-lead">
            Founded in 2018 by the Entrepreneurial Fantastic Four — Husain Khatumdi,
            Sohail Mirchandani, Varun Arora &amp; Zishan Khan — with a vision to
            tailor the needs of holiday-goers experiencing a cozy &amp; private stay,
            a home away from home. EkoStay now welcomes guests across 170+ villas
            in 15+ destinations.
          </p>

          <div className="timeline-container">
            {/* 2018 */}
            <div className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-year">2018</span>
                <h3 className="timeline-title">Where it began</h3>
                <p>
                  EkoStay began in 2018 with just ten homes in a single destination,
                  founded by four entrepreneurs — Husain Khatumdi, Sohail Mirchandani,
                  Varun Arora and Zishan Khan. The idea was simple: give holiday-goers a cozy,
                  private home away from home, and give homeowners a partner they could trust.
                </p>
              </div>
              <div className="timeline-media">
                <img src="/images/alibaug.png" alt="2018 Where it began" />
              </div>
            </div>

            {/* 2020 */}
            <div className="timeline-item timeline-item-reverse">
              <div className="timeline-content">
                <span className="timeline-year">2020</span>
                <h3 className="timeline-title">
                  Going premium — and professional
                </h3>
                <p>
                  As demand grew, so did the ambition. We introduced our Eko Gold
                  and Eko Luxe categories, opening a premium tier for guests who
                  wanted something more refined while giving owners of distinctive
                  homes a way to stand apart.
                </p>
              </div>
              <div className="timeline-media">
                <img src="/images/eko-gold.png" alt="2020 Going premium" />
              </div>
            </div>

            {/* 2025 */}
            <div className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-year">2025+</span>
                <h3 className="timeline-title"> Managed Villas &amp; Beyond</h3>
                <p>
                  Today, EkoStay stands as a nation-wide brand with over 800,000+
                  happy guests hosted. With standard services, end-to-end management,
                  and direct booking guarantees, we continue to shape luxury homestays
                  in India.
                </p>
              </div>
              <div className="timeline-media">
                <img src="/images/eko-luxe.png" alt=" managed villas" />
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
