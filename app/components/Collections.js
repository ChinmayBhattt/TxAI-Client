"use client";

import { useState } from "react";

const tabs = [
  "Mountain View Villas",
  "Water View Villas",
  "Hidden Gems",
  "Senior Citizen Friendly",
  "Corporate Offsite Villas",
  "Couples Friendly",
  "Kids Friendly",
  "Newly Launched Collections",
];

const villas = [
  {
    name: "Brooklyn",
    location: "Igatpuri",
    bhk: 6,
    bath: 6,
    price: "₹18,000",
    image: "/images/villa-brooklyn.png",
    tag: "Mountain View Villas",
  },
  {
    name: "Vanamora",
    location: "Nashik",
    bhk: 5,
    bath: 7,
    price: "₹25,000",
    image: "/images/villa-vanamora.png",
    tag: "Mountain View Villas",
  },
  {
    name: "7 Palms",
    location: "Alibaug",
    bhk: 7,
    bath: 7,
    price: "₹35,000",
    image: "/images/villa-7palms.png",
    tag: "Mountain View Villas",
  },
  {
    name: "Alpha Villa",
    location: "Igatpuri",
    bhk: 3,
    bath: 2,
    price: "₹6,000",
    image: "/images/villa-alpha.png",
    tag: "Mountain View Villas",
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
        <a href="#" className="browse-link">
          Browse All Villas →
        </a>
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
          <div key={i} className="villa-card">
            <div className="villa-img-wrapper">
              <img className="villa-img" src={v.image} alt={v.name} />
              <div className="villa-tag">{v.tag}</div>
              <div className="villa-watermark">EKOSTAY</div>
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
                <a href="#" className="villa-view">
                  View →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
