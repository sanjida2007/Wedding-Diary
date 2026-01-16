import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

const WEDDING_DATE = new Date("2025-12-05T00:00:00");

const About = () => {
  const [expanded, setExpanded] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  /* ===== Countdown Logic ===== */
  useEffect(() => {
    const diff = WEDDING_DATE - new Date();
    if (diff > 0) {
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
  }, []);

  return (
    <section className="about-page" aria-labelledby="about-heading">
      <div>
        <div className="about-container">
          {/* ===== TEXT SECTION ===== */}
          <div className="about-content">
            <h1 id="about-heading">Our Wedding Story</h1>

            {daysLeft && (
              <div className="wedding-countdown">
                💍 {daysLeft} days to forever
              </div>
            )}

            <p className="about-intro">
              Our wedding marked the start of a beautiful journey together. We
              are truly grateful for the love, prayers, and support from all who
              celebrated this special day with us.
            </p>

            <div className="about-details">
              <p><strong>Groom:</strong> Md Aminul Islam Sayem</p>
              <p><strong>Bride:</strong> Mashruba Akter Sumona</p>
              <p><strong>Wedding Date:</strong> 05 December 2025</p>
              <p><strong>Venue:</strong> Uttara, Dhaka, Bangladesh</p>
            </div>

            <p className="about-message">
              Our marriage celebrates love, friendship, and togetherness.
            </p>

            {expanded && (
              <p className="about-message fade-in">
                What began as a simple friendship slowly turned into a bond of
                trust, understanding, and love. This wedding is not just a
                ceremony—it is the promise of a lifetime together 💖
              </p>
            )}

            <button
              className="read-more-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>

          {/* ===== IMAGE SECTION ===== */}
          <div className="about-image">
            <img
              src="https://drive.google.com/thumbnail?id=1DRzXkvZtDUl_pmGmzE4JCeiLWvhG1-eV&sz=w1000"
              alt="Couple holding hands, smiling together"
              loading="lazy"
            />
          </div>
        </div>

        {/* ===== QUICK NAVIGATION (UNCHANGED) ===== */}
        <div className="quick-nav-wrapper">
          <div className="quick-nav-message">
            Explore more sections of our wedding celebration:
          </div>

          <section className="quick-nav about-quick-nav">
            <Link to="/" className="nav-card">
              <h3>🏠 Home</h3>
              <p>Back to Home</p>
            </Link>

            <Link to="/gallery" className="nav-card">
              <h3>📸 Gallery</h3>
              <p>View our photos</p>
            </Link>

            <Link to="/videos" className="nav-card">
              <h3>🎬 Videos</h3>
              <p>Watch cinematic films</p>
            </Link>

            <Link to="/contact" className="nav-card">
              <h3>📩 Contact</h3>
              <p>Send your wishes</p>
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
