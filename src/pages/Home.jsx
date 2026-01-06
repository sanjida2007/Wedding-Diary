import React, { useState, useEffect, useRef } from "react";
import photos from "../data/photos";
import videos from "../data/videos";
import "../styles/Home.css";
import "../../src/App.css";

const AUTOPLAY_DELAY = 4000;

const Home = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  const autoplayRef = useRef(null);
  const isHovered = useRef(false);
  const imageRef = useRef(null);

  /* ===== PHOTO NAVIGATION ===== */

  const nextPhoto = () =>
    setPhotoIndex((prev) => (prev + 1) % photos.length);

  const prevPhoto = () =>
    setPhotoIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );

  /* ===== VIDEO NAVIGATION ===== */

  const nextVideo = () =>
    setVideoIndex((prev) => (prev + 1) % videos.length);

  const prevVideo = () =>
    setVideoIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );

  /* ===== AUTOPLAY LOGIC ===== */

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);

    autoplayRef.current = setInterval(() => {
      if (!isHovered.current) {
        nextPhoto();
      }
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!photos.length) return;

    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [photos.length]);

  /* ===== KEYBOARD SUPPORT ===== */

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowRight":
          nextPhoto();
          resetAutoplay();
          break;
        case "ArrowLeft":
          prevPhoto();
          resetAutoplay();
          break;
        case "PageDown":
          nextVideo();
          break;
        case "PageUp":
          prevVideo();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ===== FADE ANIMATION ===== */

  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    img.style.opacity = 0;

    const fadeIn = setTimeout(() => {
      img.style.opacity = 1;
    }, 120);

    return () => clearTimeout(fadeIn);
  }, [photoIndex]);

  if (!photos.length) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl text-gray-500">
          Gallery content will appear here soon
        </p>
      </main>
    );
  }
  const [isPlaying, setIsPlaying] = useState(true);


  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-14">
        {/* ===== HERO ===== */}
        <header className="hero-intro">
          <h1>Our Wedding Journey</h1>
          <p>
            A digital collection preserving the most beautiful moments of our celebration
          </p>
        </header>

        {/* ===== PHOTO CAROUSEL ===== */}
        <article className="section-card photo-carousel mb-16">
          <h2 className="section-title">
            Featured Photographs
          </h2>

          <div className="carousel-container">
            <div
              className="photo-frame"
              onMouseEnter={() => (isHovered.current = true)}
              onMouseLeave={() => (isHovered.current = false)}
            >
              <img
                ref={imageRef}
                src={photos[photoIndex].imageUrl}
                alt={photos[photoIndex].title}
                loading="lazy"
                className="carousel-image"
              />

              <div className="photo-overlay">
                <h3>{photos[photoIndex].title}</h3>
                <span className="photo-position">
                  {photoIndex + 1} / {photos.length}
                </span>
              </div>

              <a
                href={photos[photoIndex].downloadUrl}
                download
                className="download-btn"
              >
                ⬇ Download
              </a>
            </div>

            <nav className="carousel-controls">
              <button
                onClick={() => {
                  prevPhoto();
                  resetAutoplay();
                }}
                aria-label="Previous photo"
              >
                ‹ Previous
              </button>

              <div className="autoplay-bar">
                <div key={photoIndex} className="progress" />
              </div>

              <button
                onClick={() => {
                  nextPhoto();
                  resetAutoplay();
                }}
                aria-label="Next photo"
              >
                Next ›
              </button>
            </nav>
          </div>
        </article>

        {/* ===== VIDEO CAROUSEL ===== */}
                {/* ===== VIDEO CAROUSEL ===== */}
        <article className="section-card video-carousel">
          <h2 className="section-title cinematic-title">
            Wedding Cinematic Films
          </h2>

          {videos.length ? (
            <div className="carousel-container">
              <div className="video-wrapper">
                <div className="video-frame">
                  <iframe
                    src={videos[videoIndex].videoUrl}
                    title={videos[videoIndex].title}
                    className="w-full rounded-3xl shadow-md"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <h3 className="film-title">
                  {videos[videoIndex].title}
                </h3>

                <p className="film-description">
                  {videos[videoIndex].description ||
                    "Relive the atmosphere and emotion through this carefully crafted wedding film"}
                </p>

                <nav className="carousel-controls film-nav">
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      prevVideo();
                    }}
                    aria-label="Previous video"
                  >
                    ‹ Previous Film
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      nextVideo();
                    }}
                    aria-label="Next video"
                  >
                    Next Film ›
                  </button>
                </nav>
                <footer className="carousel-counter">
                  {videoIndex + 1} of {videos.length}
                </footer>
              </div>
            </div>
          ) : (
            <div className="film-empty">
              <p>Our wedding films will be uploaded shortly</p>
            </div>
          )}
        </article>
      </section>
    </main>
  );
};

export default Home;
