"use client";

import { useEffect, useRef } from "react";

const stats = [
  { number: "175", suffix: "+", label: "Curated Villas" },
  { number: "18", suffix: "+", label: "Destinations" },
  { number: "800", suffix: "K+", label: "Happy Guests" },
  { number: "4.8", suffix: "", label: "Average Rating", star: true },
];

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".stat-item").forEach((el, i) => {
              el.style.animationDelay = `${i * 0.15}s`;
              el.classList.add("stat-animate");
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">
              {s.number}
              {s.suffix}
              {s.star && <span className="stat-star">✦</span>}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
