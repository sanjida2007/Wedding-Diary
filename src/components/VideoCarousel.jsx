import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/VideoCarousel.css";

const AUTOPLAY_DELAY = 5000;

const VideoCarousel = ({ videos }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const autoplayRef = useRef(null);
  const isHovered = useRef(false);

  const nextVideo = useCallback(
    () => setVideoIndex((prev) => (prev + 1) % videos.length),
    [videos.length]
  );
  const prevVideo = useCallback(
    () => setVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1)),
    [videos.length]
  );

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isHovered.current) nextVideo();
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!videos.length) return;
    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [videos.length, nextVideo]);

  if (!videos.length) {
    return (
      <div className="film-empty">
        <p>Our wedding films will be uploaded shortly</p>
      </div>
    );
  }

  return (
    <article className="section-card video-carousel">
      <h2 className="section-title cinematic-title">Wedding Cinematic Films</h2>

      <div
        className="carousel-container"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
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

          <h3 className="film-title">{videos[videoIndex].title}</h3>
          <p className="film-description">
            {videos[videoIndex].description ||
              "Relive the atmosphere and emotion through this carefully crafted wedding film."}
          </p>

          {/* ===== Navigation ===== */}
          <nav className="carousel-controls film-nav">
            <button onClick={prevVideo} aria-label="Previous video">
              ‹ Previous Film
            </button>
            <button onClick={nextVideo} aria-label="Next video">
              Next Film ›
            </button>
          </nav>

          <footer className="carousel-counter">
            {videoIndex + 1} of {videos.length}
          </footer>

          {/* ===== Optional Share ===== */}
          <div className="film-share-buttons">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                videos[videoIndex].videoUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaWhatsapp /> Share
            </a>
          </div>
        </div>
      </div>

      <div className="center-btn">
        <a href="/videos" className="glass-btn-full">
          ⬇ Watch All Films
        </a>
      </div>
    </article>
  );
};

export default VideoCarousel;
