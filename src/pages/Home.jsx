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
      </section>
    </main>
  );
};

export default Home;
