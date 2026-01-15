import React from "react";
import { Link } from "react-router-dom";
import photos from "../data/photos";
import videos from "../data/videos";
import "../styles/Home.css";
import PhotoCarousel from "../components/PhotoCarousel";
import VideoCarousel from "../components/VideoCarousel";

const Home = () => {
  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-14">
        {/* ===== HERO ===== */}
        <header className="hero-intro">
          <h1>Our Wedding Journey</h1>
          <p>
            A digital collection preserving the most beautiful moments of our
            celebration
          </p>
        </header>

        {/* ===== QUICK NAVIGATION ===== */}
        <section className="quick-nav">
          <Link to="/gallery" className="nav-card">
            <h3>📸 Gallery</h3>
          </Link>

          <Link to="/videos" className="nav-card">
            <h3>🎬 Videos</h3>
          </Link>

          <Link to="/about" className="nav-card">
            <h3>💍 Story </h3>
          </Link>

          <Link to="/contact" className="nav-card">
            <h3>📩 Contact</h3>
          </Link>
        </section>

        {/* ===== PHOTO CAROUSEL ===== */}
        <PhotoCarousel photos={photos} />

        {/* ===== VIDEO CAROUSEL ===== */}
        <VideoCarousel videos={videos} />

        {/* ===== ABOUT SECTION PREVIEW ===== */}
{/* ===== ABOUT SECTION PREVIEW ===== */}
<section className="section-card about-preview">
  <h2 className="section-title">Our Wedding Story</h2>
  <div className="about-preview-container">
    <div className="about-preview-image">
      <div className="image-overlay"></div>
      <img
        src="https://drive.google.com/thumbnail?id=1DRzXkvZtDUl_pmGmzE4JCeiLWvhG1-eV&sz=w1000"
        alt="Couple holding hands, smiling together"
        loading="lazy"
      />
      {/* Floating Icons */}
      <div className="floating-icons">
        <span className="icon-heart">💖</span>
        <span className="icon-ring">💍</span>
        <span className="icon-dove">🕊️</span>
      </div>
    </div>

    <div className="about-preview-text">
      <p>
        Our wedding marked the beginning of a <span className="highlight">beautiful journey</span> together.
        Thanks to all our <span className="highlight">friends and family</span> for the love and support 💖
      </p>
      <ul>
        <li><strong>Groom:</strong> Md Aminul Islam Sayem</li>
        <li><strong>Bride:</strong> Mashruba Akter Sumona</li>
        <li><strong>Date:</strong> 05 Dec 2025</li>
      </ul>
      <Link to="/about" className="glass-btn about-btn shine-hover">
        💍 Read Our Story
      </Link>
    </div>
  </div>
</section>

{/* ===== CONTACT SECTION PREVIEW ===== */}
<section className="section-card contact-preview">
  <h2 className="section-title">Send Your Wishes 💖</h2>
  <div className="contact-preview-container">
    <p>
      We’d love to hear from you! Send your <span className="highlight">messages, wishes </span>, or
      <span className="highlight"> questions</span> to Sayem & Sumona 💍
    </p>
    <Link to="/contact" className="glass-btn contact-btn shine-hover">
      📩 Send a Message
    </Link>
    {/* Floating Confetti */}
    <div className="floating-confetti">
      <span>🎉</span><span>💖</span><span>💍</span><span>✨</span><span>🕊️</span>
    </div>
  </div>
</section>



      </section>
    </main>
  );
};

export default Home;
