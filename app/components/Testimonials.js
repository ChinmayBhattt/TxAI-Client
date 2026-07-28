"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Priya & Rahul M.",
    location: "Stayed at Brooklyn, Igatpuri",
    rating: 5,
    text: "The villa exceeded every expectation. Waking up to misty mountains with a private pool was surreal. EkoStay's attention to detail — from the welcome hamper to the perfectly stocked kitchen — made it feel like a true luxury retreat.",
    date: "June 2025",
  },
  {
    name: "Ananya S.",
    location: "Stayed at 7 Palms, Alibaug",
    rating: 5,
    text: "We hosted a family reunion here and it was absolutely perfect. Seven bedrooms, gorgeous interiors, and the staff arranged a private BBQ by the pool. Can't recommend EkoStay enough for large group getaways.",
    date: "May 2025",
  },
  {
    name: "Vikram & Neha K.",
    location: "Stayed at Vanamora, Nashik",
    rating: 5,
    text: "Vanamora is a hidden paradise. The vineyard views, the infinity pool, and the quiet — it was exactly the digital detox we needed. Booking through EkoStay was seamless and hassle-free.",
    date: "April 2025",
  },
  {
    name: "Arjun D.",
    location: "Stayed at Alpha Villa, Igatpuri",
    rating: 4,
    text: "Great value for money. Clean, well-maintained, and the caretaker was incredibly helpful. Perfect for a quick weekend escape from Mumbai. Already planning our next visit!",
    date: "March 2025",
  },
];

function StarRating({ rating }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-inner">
        <div className="section-subtitle" style={{ textAlign: "center" }}>
          Guest Stories
        </div>
        <h2
          className="section-title"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          What our guests <em>say</em>
        </h2>

        <div className="testimonial-carousel">
          <button
            className="testimonial-arrow testimonial-arrow-left"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonial-cards">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card ${i === active ? "active" : ""}`}
              >
                <div className="testimonial-quote">"</div>
                <StarRating rating={t.rating} />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-location">{t.location}</div>
                  </div>
                </div>
                <div className="testimonial-date">{t.date}</div>
              </div>
            ))}
          </div>

          <button
            className="testimonial-arrow testimonial-arrow-right"
            onClick={next}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
