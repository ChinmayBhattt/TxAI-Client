export default function TopBanner() {
  return (
    <div className="top-banner">
      <span className="gift-icon">🎁</span>
      <span className="sale-title">The Great Getaway Sale</span>
      <span className="sale-text">
        {" "}
        — Flat 26% Off On All Properties · Code:{" "}
        <span className="sale-code">GETAWAY26</span>
      </span>
    </div>
  );
}
