"use client";

import { useState } from "react";

const tabs = [
  "Mountain View Villas",
  "Hidden Gems",
  "Senior Citizen Friendly",
  "Corporate Offsite Villas",
  "Couples Friendly",
  "Kids Friendly",
  "Newly Launched Collections",
];

const villas = [
  {
    name: "Vistara Villa",
    location: "Igatpuri",
    bhk: 3,
    bath: 2,
    price: "₹12,000",
    image: "/images/vistara-1.png",
    tag: "Mountain View Villas",
    slug: "vistara-villa",
  },
  {
    name: "Amora Villa",
    location: "Igatpuri",
    bhk: 3,
    bath: 2,
    price: "₹12,000",
    image: "/images/amora-1.png",
    tag: "Water View Villas",
    slug: "amora-villa",
  },
];

const BedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7v11M21 7v11M3 18h18M5 7h14a2 2 0 012 2v4H3V9a2 2 0 012-2z" />
    <path d="M6 7V5a1 1 0 011-1h4a1 1 0 011 1v2M12 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

const BathIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z" />
    <path d="M6 12V5a2 2 0 012-2h1" />
    <path d="M7 20v2M17 20v2" />
  </svg>
);

export default function Collections() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="collections" id="collections">
      <div className="section-header">
        <div>
          <div className="section-subtitle">Handpicked Stays</div>
          <h2 className="section-title">
            Featured <em>collections</em>
          </h2>
        </div>
        {/* <a href="/collections" className="browse-link">
          Browse All Villas →
        </a> */}
      </div>

      <div className="collection-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tab-btn ${i === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="villas-grid">
        {villas.map((v, i) => (
          <a
            key={i}
            href={`/villa/${v.slug}`}
            className="villa-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="villa-img-wrapper">
              <img className="villa-img" src={v.image} alt={v.name} />
            </div>
            <div className="villa-details">
              <div className="villa-location">{v.location}</div>
              <div className="villa-name">{v.name}</div>
              <div className="villa-specs">
                <div className="villa-spec">
                  <BedIcon />
                  {v.bhk} BHK
                </div>
                <div className="villa-spec">
                  <BathIcon />
                  {v.bath} Bath
                </div>
              </div>
              <div className="villa-footer">
                <div className="villa-price">
                  {v.price} <span>/night</span>
                </div>
                <span className="villa-view">View →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
