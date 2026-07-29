"use client";

import { useState } from "react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFloat from "../components/ContactFloat";

const collectionVillas = [
  {
    name: "Vistara Villa",
    slug: "vistara-villa",
    location: "Igatpuri",
    category: "Mountain View Villas",
    badge: "Eko Gold",
    bhk: 4,
    bath: 4,
    guests: 12,
    price: "₹12,000",
    originalPrice: "₹26,000",
    image: "/images/vistara-hero.png",
    amenities: ["Balcony", "Music System", "WiFi", "Private Pool", "Scenic"],
    tags: ["FAMILY FRIENDLY", "OUTDOORSY", "SCENIC"],
  },
  {
    name: "Amora Villa",
    slug: "amora-villa",
    location: "Alibaug",
    category: "Water View Villas",
    badge: "Eko Luxe",
    bhk: 5,
    bath: 5,
    guests: 14,
    price: "₹12,000",
    originalPrice: "₹38,000",
    image: "/images/amora-hero.png",
    amenities: ["Spacious Lawn", "Music System", "Private Pool", "WiFi", "Dining Table"],
    tags: ["FAMILY FRIENDLY", "INSTA WORTHY", "SCENIC"],
  },
  {
    name: "Brooklyn Villa",
    slug: "vistara-villa",
    location: "Igatpuri",
    category: "Mountain View Villas",
    badge: "Eko Gold",
    bhk: 6,
    bath: 6,
    guests: 24,
    price: "₹18,000",
    originalPrice: "₹22,880",
    image: "/images/villa-brooklyn.png",
    amenities: ["Balcony", "Music System", "WiFi", "Wardrobe", "Flat Screen TV", "Dining Table", "Private Parking", "Air Conditioner"],
    tags: ["FAMILY FRIENDLY", "OUTDOORSY", "SCENIC"],
  },
  {
    name: "Vanamora Villa",
    slug: "amora-villa",
    location: "Nashik",
    category: "Mountain View Villas",
    badge: "Eko Gold",
    bhk: 5,
    bath: 7,
    guests: 20,
    price: "₹25,000",
    originalPrice: "₹31,500",
    image: "/images/villa-vanamora.png",
    amenities: ["Balcony", "Spacious Lawn", "Music System", "Caretaker", "Private Pool", "WiFi", "Outdoor Furniture", "Dining Table"],
    tags: ["FAMILY FRIENDLY", "OUTDOORSY", "SCENIC", "INSTA WORTHY"],
  },
  {
    name: "7 Palms Villa",
    slug: "amora-villa",
    location: "Alibaug",
    category: "Mountain View Villas",
    badge: "Eko Luxe",
    bhk: 7,
    bath: 7,
    guests: 22,
    price: "₹35,000",
    originalPrice: "₹42,000",
    image: "/images/villa-7palms.png",
    amenities: ["Private Pool", "Care Taker", "WiFi", "Outdoor Dining"],
    tags: ["LUXURY", "INSTA WORTHY"],
  },
  {
    name: "Alpha Villa",
    slug: "vistara-villa",
    location: "Igatpuri",
    category: "Mountain View Villas",
    badge: "Eko Gold",
    bhk: 3,
    bath: 2,
    guests: 10,
    price: "₹6,000",
    originalPrice: "₹8,500",
    image: "/images/villa-alpha.png",
    amenities: ["Private Pool", "WiFi", "Air Conditioner"],
    tags: ["POCKET FRIENDLY", "SCENIC"],
  },
];

const locationFilters = [
  "All",
  "Igatpuri",
  "Nashik",
  "Alibaug",
  "Karjat",
  "Kodaikanal",
  "Lonavala",
  "Goa",
  "Ooty And Coonoor",
  "Panchgani",
];

export default function CollectionsClient() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredVillas =
    selectedLocation === "All"
      ? collectionVillas
      : collectionVillas.filter((v) => v.location === selectedLocation);

  return (
    <>
      <TopBanner />
      <Navbar />

      {/* Hero Showcase Banner */}
      <section className="col-hero-banner">
        <div className="col-hero-bg">
          <img src="/images/villa-alpha.png" alt="Featured Villa Collection" />
          <div className="col-hero-overlay" />
        </div>

        <div className="col-hero-content">
          <div className="col-hero-tag">— FEATURED COLLECTION ·   —</div>
          <h1 className="col-hero-title">Alpha Villa</h1>
          <div className="col-hero-location">📍 IGATPURI</div>

          <div className="col-hero-specs">
            <span className="col-spec-pill">👥 10 Guests</span>
            <span className="col-spec-pill">🛏️ 3 BHK</span>
            <span className="col-spec-pill">🚿 2 Bath</span>
          </div>

          <button className="col-video-btn">
            <span>▶</span> PROPERTY VIDEO
          </button>
        </div>

        <div className="col-hero-arrows">
          <button className="col-arrow-btn">‹</button>
          <button className="col-arrow-btn">›</button>
        </div>
      </section>

      {/* "Why Mountain View" / Collection Narrative */}
      <section className="col-narrative-section">
        <div className="col-narrative-inner">
          <div className="section-subtitle" style={{ textAlign: "center" }}>
            WHY MOUNTAIN VIEW?
          </div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px" }}>
            The view from <em>up here</em>
          </h2>

          <div className="col-narrative-body">
            <p>
              <strong>Mountain View Villas by  </strong> are your
              front-row seat to nature&apos;s finest views — where every window
              frames a postcard-perfect valley. Whether you&apos;re sipping your
              morning coffee in the hills of <strong>Lonavala</strong>, soaking in
              the misty charm of <strong>Igatpuri</strong>, or unwinding in the
              breezy vibes of <strong>Panchgani and Ooty</strong>, our villas
              promise serenity with a side of scenic drama. 🌿🏔️
            </p>
            <p>
              Each villa is thoughtfully designed to complement its landscape — from
              modern hillside retreats to colonial-style getaways. You&apos;ll find
              cozy bedrooms, spacious living areas, private lawns, and decks that
              open up to sweeping valley backdrops — perfect for catching
              sunrises, sunsets, or simply escaping city chaos.
            </p>
            <p className="col-tagline-quote">
              Breathe easy. Slow down. Stay with a view.
            </p>
          </div>

          {/* 3 Feature Cards */}
          <div className="col-features-grid">
            <div className="col-feature-card">
              <div className="col-feature-number">01</div>
              <div className="col-feature-icon-box">🏔️</div>
              <h3 className="col-feature-title">Panoramic Views</h3>
              <p className="col-feature-desc">
                Floor-to-ceiling windows and open terraces framing layered ridgelines,
                valleys and a horizon that shifts through the day.
              </p>
            </div>

            <div className="col-feature-card">
              <div className="col-feature-number">02</div>
              <div className="col-feature-icon-box">💨</div>
              <h3 className="col-feature-title">Cool Mountain Air</h3>
              <p className="col-feature-desc">
                A few degrees cooler and a world quieter — crisp, clean air that makes
                every stay feel like a long exhale.
              </p>
            </div>

            <div className="col-feature-card">
              <div className="col-feature-number">03</div>
              <div className="col-feature-icon-box">✨</div>
              <h3 className="col-feature-title">Misty Dawns, Starlit Nights</h3>
              <p className="col-feature-desc">
                Sunrises that arrive through the mist and clear, unpolluted skies
                that fill with stars once the sun goes down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Bar */}
      <section className="col-avail-section">
        <div className="col-avail-inner">
          <div className="col-avail-label">CHECK AVAILABILITY ACROSS THIS COLLECTION</div>
          <div className="col-avail-bar">
            <div className="col-avail-field">
              <span className="col-field-tag">CHECK IN</span>
              <span className="col-field-val">Add date</span>
            </div>
            <div className="col-avail-divider" />
            <div className="col-avail-field">
              <span className="col-field-tag">CHECK OUT</span>
              <span className="col-field-val">Add date</span>
            </div>
            <div className="col-avail-divider" />
            <div className="col-avail-field">
              <span className="col-field-tag">GUESTS</span>
              <span className="col-field-val">0 guests</span>
            </div>
            <button className="col-search-btn">🔍 SEARCH</button>
          </div>
        </div>
      </section>

      {/* Main Collection Grid */}
      <section className="col-main-section">
        <div className="col-main-inner">
          <div className="section-subtitle" style={{ textAlign: "center" }}>
            THE COLLECTION
          </div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "8px" }}>
            Mountain View Villas
          </h2>
          <p className="col-count-text">
            {filteredVillas.length} handpicked villas in this collection
          </p>

          {/* Location Filters */}
          <div className="col-filter-bar">
            {locationFilters.map((loc, i) => (
              <button
                key={i}
                className={`col-filter-chip ${selectedLocation === loc ? "active" : ""
                  }`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Villa Cards Grid */}
          <div className="col-villas-grid">
            {filteredVillas.map((v, i) => (
              <div key={i} className="col-villa-card">
                <div className="col-card-media">
                  <img src={v.image} alt={v.name} className="col-card-img" />
                  <div className="col-card-badge">{v.badge}</div>
                  <div className="col-watermark"> </div>
                  <div className="col-img-counter">1/20</div>
                </div>

                <div className="col-card-body">
                  <div className="col-card-header">
                    <div>
                      <h3 className="col-card-name">{v.name}</h3>
                      <div className="col-card-loc">{v.location.toUpperCase()}</div>
                    </div>
                    <div className="col-card-pricing">
                      <span className="col-orig-price">{v.originalPrice}</span>
                      <div className="col-main-price">
                        {v.price} <small>/PER NIGHT ONWARDS</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-card-specs">
                    <span>👥 {v.guests} Guests</span>
                    <span>🛏️ {v.bhk} BHK</span>
                    <span>🚿 {v.bath} Bath</span>
                  </div>

                  <div className="col-card-amenities">
                    {v.amenities.map((item, idx) => (
                      <span key={idx} className="col-amenity-item">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="col-card-tags">
                    {v.tags.map((t, idx) => (
                      <span key={idx} className="col-tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a href={`/villa/${v.slug}`} className="col-view-btn">
                    VIEW DETAILS →
                  </a>
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
