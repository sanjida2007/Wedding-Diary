import React, { useEffect } from "react"; 
import { Link } from "react-router-dom";
import photos from "../data/photos";
import videos from "../data/videos";
import "../styles/Home.css";
import PhotoCarousel from "../components/PhotoCarousel";
import VideoCarousel from "../components/VideoCarousel";
import SectionPreview from "../components/SectionPreview";
import InstallApp from "../components/InstallApp";


const Home = () => {
  // ===== Scroll Fade-In Effect =====
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-14">
        {/* ===== HERO ===== */}
        <header className="hero-intro cinematic-hero scroll-fade">
          <div className="hero-bg-overlay"></div>
          <h1 className="typewriter">Our Wedding Journey</h1>
          <p className="hero-tagline">
            A digital collection preserving the most beautiful moments of our celebration
          </p>
          <div className="hero-floating-icons">
            <span>💖</span>
            <span>💍</span>
            <span>🕊️</span>
          </div>
        </header>

        {/* ===== QUICK NAVIGATION ===== */}
        <section className="quick-nav scroll-fade">
          <Link to="/gallery" className="nav-card">
            <h3>📸 Gallery</h3>
          </Link>
          <Link to="/videos" className="nav-card">
            <h3>🎬 Videos</h3>
          </Link>
          <Link to="/about" className="nav-card">
            <h3>💍 Story</h3>
          </Link>
          <Link to="/contact" className="nav-card">
            <h3>📩 Contact</h3>
          </Link>
        </section>

        {/* ===== PHOTO CAROUSEL ===== */}
        <PhotoCarousel photos={photos} />

        {/* ===== VIDEO CAROUSEL ===== */}
        <VideoCarousel videos={videos} />

        {/* ===== ABOUT & Contact SECTION PREVIEW ===== */}
        
      <SectionPreview />


      </section>
    </main>
  );
};

export default Home;
