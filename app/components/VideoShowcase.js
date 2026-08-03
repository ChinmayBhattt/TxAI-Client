"use client";

import { useRef, useState } from "react";

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [hasVideo] = useState(false); // Set to true once a real video file is added

  return (
    <section className="video-showcase" id="video">
      <div className="video-showcase-inner">
        <div className="section-subtitle" style={{ textAlign: "center" }}>
          Experience the Vibe
        </div>
        <h2
          className="section-title"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          Feel it before you <em>arrive</em>
        </h2>

        <div className="video-showcase-wrapper">
          {hasVideo ? (
            <video
              ref={videoRef}
              className="video-showcase-player"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-bg-1.png"
            >
              {/* Replace the src below with your actual video file */}
              <source src="/images/staycation-video.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src="/images/hero-bg-2.png"
              alt="Staycation Villas Experience"
              className="video-showcase-player"
            />
          )}
          <div className="video-showcase-overlay">
            <div className="video-showcase-content">
              <h3 className="video-showcase-heading">
                Your perfect getaway <em>awaits</em>
              </h3>
              <p className="video-showcase-desc">
                Private pools · Mountain views · Luxury interiors
              </p>
            </div>
            <div className="video-showcase-badge">
              <span className="video-badge-dot" />
              <span>Staycation Villas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
