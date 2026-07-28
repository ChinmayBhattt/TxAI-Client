import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFloat from "../components/ContactFloat";

export const metadata = {
  title: "Our Team | EkoStay Leadership",
  description:
    "Meet the people powering EkoStay — the co-founders and team behind India's premier villa holiday brand.",
};

const founders = [
  {
    name: "Husain Khatumdi",
    role: "Co-Founder",
    image: "/images/founder1.png",
    bio: "Pioneering operational excellence and guest experience across all EkoStay properties.",
  },
  {
    name: "Sohail Mirchandani",
    role: "Co-Founder",
    image: "/images/founder2.png",
    bio: "Driving business development, portfolio expansion, and strategic property acquisitions.",
  },
  {
    name: "Varun Arora",
    role: "Co-Founder",
    image: "/images/founder3.png",
    bio: "Heading brand strategy, marketing vision, and customer growth initiatives.",
  },
  {
    name: "Zishan Khan",
    role: "Co-Founder",
    image: "/images/founder4.png",
    bio: "Spearheading tech innovations, seamless booking engine, and property management systems.",
  },
];

export default function TeamPage() {
  return (
    <>
      <TopBanner />
      <Navbar />

      {/* Team Hero */}
      <section className="team-hero">
        <div className="team-hero-inner">
          <div className="team-subtitle">— OUR TEAM —</div>
          <h1 className="team-hero-title">
            Meet the people <em>powering EkoStay</em>
          </h1>
          <p className="team-hero-desc">
            We take pride in professionally managing properties as effortless
            vacation homes — removing the owner&apos;s hassle of hosting and guest
            servicing, so every stay feels seamless.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="team-founders-section">
        <div className="team-founders-inner">
          <div className="section-subtitle" style={{ textAlign: "center" }}>
            — LEADERSHIP —
          </div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "50px" }}>
            The <em>founders</em> behind EkoStay
          </h2>

          <div className="founders-grid">
            {founders.map((f, i) => (
              <div key={i} className="founder-card">
                <div className="founder-img-wrapper">
                  <img src={f.image} alt={f.name} className="founder-img" />
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{f.name}</h3>
                  <div className="founder-role">{f.role}</div>
                  <p className="founder-bio">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ContactFloat />
    </>
  );
}
