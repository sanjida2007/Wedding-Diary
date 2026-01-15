import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-page" aria-labelledby="about-heading">
      <div>
        <div className="about-container">
          {/* Text Section */}
          <div className="about-content">
            <h1 id="about-heading">Our Wedding Story</h1>
            <p className="about-intro">
              Our wedding marked the start of a beautiful journey together. We
              are truly grateful for the love, prayers, and support from all who
              celebrated this special day with us.
            </p>

            <div className="about-details">
              <p>
                <strong>Groom:</strong> Md Aminul Islam Sayem
              </p>
              <p>
                <strong>Bride:</strong> Mashruba Akter Sumona
              </p>
              <p>
                <strong>Wedding Date:</strong> 05 December 2025
              </p>
              <p>
                <strong>Venue:</strong> Uttara, Dhaka, Bangladesh
              </p>
            </div>

            <p className="about-message">
              Our marriage celebrates love, friendship, and togetherness. Thank
              you for keeping us in your thoughts and prayers, and for sharing
              in our joy 💖
            </p>
          </div>

          {/* Image Section */}
          <div className="about-image">
            <img
              src="https://drive.google.com/thumbnail?id=1DRzXkvZtDUl_pmGmzE4JCeiLWvhG1-eV&sz=w1000"
              alt="Couple holding hands, smiling together"
              loading="lazy"
            />
          </div>
        </div>

        {/* ===== QUICK NAVIGATION AFTER ABOUT-CONTAINER ===== */}
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
