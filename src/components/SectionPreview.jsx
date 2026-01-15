import React from "react";
import { Link } from "react-router-dom";
import "../styles/SectionPreview.css";

const SectionPreview = () => {
  return (
    <>
      {/* ===== ABOUT SECTION PREVIEW ===== */}
      <section className="section-card about-preview scroll-fade">
        <h2 className="section-title">Our Wedding Story</h2>

        <div className="about-preview-container">
          <div className="about-preview-image parallax-image">
            <div className="image-overlay"></div>

            <img
              src="https://drive.google.com/thumbnail?id=1DRzXkvZtDUl_pmGmzE4JCeiLWvhG1-eV&sz=w1000"
              alt="Couple holding hands, smiling together"
              loading="lazy"
            />

            <div className="floating-icons">
              <span className="icon-heart">💖</span>
              <span className="icon-ring">💍</span>
              <span className="icon-dove">🕊️</span>
            </div>
          </div>

          <div className="about-preview-text">
            <p>
              Our wedding marked the beginning of a{" "}
              <span className="highlight">beautiful journey</span> together.
              Thanks to all our{" "}
              <span className="highlight">friends and family</span> for the love
              and support 💖
            </p>

            <ul>
              <li>
                <strong>Groom:</strong> Md Aminul Islam Sayem
              </li>
              <li>
                <strong>Bride:</strong> Mashruba Akter Sumona
              </li>
              <li>
                <strong>Date:</strong> 05 Dec 2025
              </li>
            </ul>

            <Link
              to="/about"
              className="glass-btn about-btn shine-hover glow-hover"
            >
              💍 Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION PREVIEW ===== */}
      <section className="section-card contact-preview scroll-fade">
        <h2 className="section-title">Send Your Wishes 💖</h2>

        <div className="contact-preview-container">
          <p>
            We’d love to hear from you! Send your{" "}
            <span className="highlight">messages, wishes</span>, or{" "}
            <span className="highlight">questions</span> to Sayem & Sumona 💍
          </p>

          <Link
            to="/contact"
            className="glass-btn contact-btn shine-hover glow-hover"
          >
            📩 Send a Message
          </Link>

          <div className="floating-confetti">
            <span>🎉</span>
            <span>💖</span>
            <span>💍</span>
            <span>✨</span>
            <span>🕊️</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionPreview;
