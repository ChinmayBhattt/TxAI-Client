const destinations = [
  { name: "Alibaug", count: 41, image: "/images/alibaug.png", badge: "Most Booked", large: true },
  { name: "Goa", count: 23, image: "/images/goa.png" },
  { name: "Lonavala", count: 31, image: "/images/lonavala.png" },
  { name: "Igatpuri", count: 16, image: "/images/igatpuri.png", large: false },
  { name: "Karjat", count: 17, image: "/images/karjat.png" },
  { name: "Panchgani", count: 7, image: "/images/panchgani.png" },
];

export default function Explore() {
  return (
    <section className="explore" id="destinations">
      <div className="section-header">
        <div>
          <div className="section-subtitle">Explore By Place</div>
          <h2 className="section-title">
            Find your <em>perfect escape</em>
          </h2>
        </div>
        <div className="section-nav-arrows">
          <button className="nav-arrow" aria-label="Previous">
            ←
          </button>
          <button className="nav-arrow" aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div className="destinations-grid">
        {destinations.map((d, i) => (
          <div key={i} className={`dest-card ${d.large ? "large" : ""}`}>
            <div className="dest-img-wrapper">
              <img className="dest-img" src={d.image} alt={d.name} />
              <div className="dest-overlay" />
              {d.badge && <div className="dest-badge">{d.badge}</div>}
              <div className="dest-info">
                <div className="dest-name">{d.name}</div>
                <div className="dest-count">{d.count} Villas</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
