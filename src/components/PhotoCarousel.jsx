import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaWhatsapp } from "react-icons/fa";
import "../styles/PhotoCarousel.css";

const AUTOPLAY_DELAY = 4000;

const PhotoCarousel = ({ photos }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const autoplayRef = useRef(null);
  const isHovered = useRef(false);
  const imageRef = useRef(null);

  const nextPhoto = useCallback(
    () => setPhotoIndex((prev) => (prev + 1) % photos.length),
    [photos.length]
  );
  const prevPhoto = useCallback(
    () => setPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
    [photos.length]
  );

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isHovered.current) nextPhoto();
    }, AUTOPLAY_DELAY);
  };

  useEffect(() => {
    if (!photos.length) return;
    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [photos.length, nextPhoto]);

  useEffect(() => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    img.style.opacity = 0;
    const fadeIn = setTimeout(() => (img.style.opacity = 1), 120);
    return () => clearTimeout(fadeIn);
  }, [photoIndex]);

  // Keyboard navigation for popup
  useEffect(() => {
    if (!modalOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, nextPhoto, prevPhoto]);

  if (!photos.length) return null;

  return (
    <>
      {/* ===== PHOTO CAROUSEL ===== */}
      <article className="section-card photo-carousel mb-16">
        <h2 className="section-title">Featured Photographs</h2>

        <div className="carousel-container">
          <div
            className="photo-frame"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            onClick={() => setModalOpen(true)} // open popup on click
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

            {/* Download */}
            <a
              href={photos[photoIndex].downloadUrl}
              download
              className="download-btn"
            >
              ⬇ Download
            </a>

            {/* Favorite / Like */}
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // prevent modal open
                setLiked(!liked);
              }}
            >
              <FaHeart /> {liked ? "Liked" : "Like"}
            </button>

            {/* Social Share */}
            <div className="share-buttons">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  photos[photoIndex].imageUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp /> Share
              </a>
            </div>
          </div>

          {/* Carousel controls */}
          <nav className="carousel-controls">
            <button
              onClick={() => {
                prevPhoto();
                resetAutoplay();
              }}
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
            >
              Next ›
            </button>
          </nav>
        </div>

        {/* Center Button */}
        <div className="center-btn">
          <Link to="/gallery" className="glass-btn-photo">
            ⬇ View Full Gallery
          </Link>
        </div>
      </article>

      {/* ===== POPUP LIGHTBOX ===== */}
      {modalOpen && (
        <div
          className="photo-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="photo-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <img
              src={photos[photoIndex].imageUrl}
              alt={photos[photoIndex].title}
            />

            <h3 className="modal-image-title">{photos[photoIndex].title}</h3>

            {/* ===== First Row: Prev / Next ===== */}
            <div className="modal-nav-row">
              <button onClick={prevPhoto}>‹ Prev</button>
              <button onClick={nextPhoto}>Next ›</button>
            </div>

            {/* ===== Second Row: Download / WhatsApp ===== */}
            <div className="modal-action-row">
              <a
                href={photos[photoIndex].downloadUrl}
                download
                className="modal-download-btn"
              >
                ⬇ Download
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  photos[photoIndex].imageUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-whatsapp-share"
              >
                <FaWhatsapp /> Share
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCarousel;
