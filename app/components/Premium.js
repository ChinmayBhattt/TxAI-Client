const tiers = [
  {
    number: "01",
    badge: "Signature",
    name: "Eko Gold",
    image: "/images/eko-gold.png",
  },
  {
    number: "02",
    badge: "Ultra Luxury",
    name: "Eko Luxe",
    image: "/images/eko-luxe.png",
  },
];

export default function Premium() {
  return (
    <section className="premium" id="luxury">
      <div className="watermark-bg">EKO</div>
      <div className="premium-inner">
        <div className="section-subtitle" style={{ textAlign: "center" }}>
          Premium Collections By Staycation Villas
        </div>
        <h2
          className="section-title"
          style={{ textAlign: "center", color: "#fff", marginBottom: "12px" }}
        >
          Villas built for <em>the unforgettable</em>
        </h2>
        <p className="premium-tagline">
          Two Tiers Of Extraordinary — Hover To Explore
        </p>

        <div className="premium-grid">
          {tiers.map((t, i) => (
            <div key={i} className="premium-card">
              <img className="premium-card-img" src={t.image} alt={t.name} />
              <div className="premium-card-overlay" />
              <div className="premium-card-number">{t.number}</div>
              <div className="premium-card-info">
                <div className="premium-card-badge">{t.badge}</div>
                <div className="premium-card-name">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
