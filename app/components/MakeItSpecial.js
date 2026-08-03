const services = [
  {
    icon: "🎤",
    title: "Live Singer",
    desc: "Set the mood with a professional live singer performing soulful melodies under the stars.",
    image: "/images/special-singer.png",
  },
  {
    icon: "🔥",
    title: "Bonfire",
    desc: "Gather around a crackling bonfire with blankets, s'mores, and stories that last a lifetime.",
    image: "/images/special-bonfire.png",
  },
  {
    icon: "💆",
    title: "Massage",
    desc: "Unwind with a rejuvenating spa massage right at your villa — the ultimate indulgence.",
    image: "/images/special-massage.png",
  },
  {
    icon: "🍸",
    title: "Bartender",
    desc: "Elevate your evening with a private bartender crafting bespoke cocktails to your taste.",
    image: "/images/special-bartender.png",
  },
];

export default function MakeItSpecial() {
  return (
    <section className="make-it-special" id="make-it-special">
      <div className="make-it-special-inner">
        <div className="section-subtitle" style={{ textAlign: "center" }}>
          Premium Add-Ons
        </div>
        <h2
          className="section-title"
          style={{ textAlign: "center", marginBottom: "16px" }}
        >
          Make it <em>Special</em>
        </h2>
        <p className="make-it-special-tagline">
          Curate unforgettable moments with our premium concierge services
        </p>

        <div className="make-it-special-grid">
          {services.map((s, i) => (
            <div key={i} className="special-card">
              <div className="special-card-img-wrap">
                <img
                  src={s.image}
                  alt={s.title}
                  className="special-card-img"
                />
                <div className="special-card-overlay" />
                <div className="special-card-icon">{s.icon}</div>
              </div>
              <div className="special-card-body">
                <h3 className="special-card-title">{s.title}</h3>
                <p className="special-card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
