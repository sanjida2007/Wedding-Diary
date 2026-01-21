import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaWhatsapp, FaTimes, FaLink } from "react-icons/fa";
import "../styles/VideoCarousel.css";

const AUTOPLAY_DELAY = 5000;

const VideoCarousel = ({ videos }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideoIndex, setModalVideoIndex] = useState(0);

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

  const openModal = (index) => {
    setModalVideoIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const copyLink = () => {
    navigator.clipboard.writeText(videos[modalVideoIndex].videoUrl);
    alert("Link copied to clipboard!");
  };

  if (!videos.length) {
    return (
      <section className="film-empty">
        <p>Our wedding films will be uploaded shortly</p>
      </section>
    );
  }

  return (
    <section className="video-carousel-section">
      <div
        className="carousel-container"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <article className="video-card">
          <div className="video-frame" onClick={() => openModal(videoIndex)}>
            <iframe
              src={videos[videoIndex].videoUrl}
              title={videos[videoIndex].title}
              className="carousel-iframe"
              allowFullScreen
              loading="lazy"
            />
            <div className="video-overlay">
              <span className="play-button">▶</span>
            </div>
          </div>

          <nav className="carousel-controls">
            <button onClick={prevVideo} aria-label="Previous video">
              ‹ Prev
            </button>
            <button onClick={nextVideo} aria-label="Next video">
              Next ›
            </button>
          </nav>
        </article>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="video-modal" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>

            <iframe
              src={videos[modalVideoIndex].videoUrl}
              title={videos[modalVideoIndex].title}
              className="modal-video"
              allowFullScreen
            />

            <div className="modal-share-buttons">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  videos[modalVideoIndex].videoUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <button onClick={copyLink} className="share-btn">
                <FaLink /> Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoCarousel;
