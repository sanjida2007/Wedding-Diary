import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import photos from "../data/photos";
import rawphotos from "../data/rawphotos";
import { FaWhatsapp } from "react-icons/fa";

import "../styles/Gallery.css";

const Gallery = () => {
  const [search] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // which gallery is active
  const [currentGallery, setCurrentGallery] = useState("photos");

  // carousel
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [randomCarouselPhotos, setRandomCarouselPhotos] = useState([]);

  // ======================
  // FILTERED GALLERIES
  // ======================
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredRawPhotos = useMemo(() => {
    return rawphotos.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // decide which gallery modal uses
  const activePhotos =
    currentGallery === "photos"
      ? filteredPhotos
      : filteredRawPhotos;

  // ======================
  // MODAL CONTROLS
  // ======================
  const openModal = useCallback((index, type = "photos") => {
    setCurrentGallery(type);
    setActiveIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = () => setModalOpen(false);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === activePhotos.length - 1 ? 0 : prev + 1
    );
  }, [activePhotos]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? activePhotos.length - 1 : prev - 1
    );
  }, [activePhotos]);

  // ======================
  // RANDOM HEADER CAROUSEL
  // ======================
  useEffect(() => {
    const shuffled = [...photos].sort(() => 0.5 - Math.random());
    setRandomCarouselPhotos(shuffled);
  }, []);

  useEffect(() => {
    if (!randomCarouselPhotos.length) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev === randomCarouselPhotos.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [randomCarouselPhotos]);

  // ======================
  // KEYBOARD SUPPORT
  // ======================
  useEffect(() => {
    if (!modalOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, nextImage, prevImage]);

  return (
    <main className="gallery-page">
      <section className="app-container py-12">

        {/* ================= HEADER ================= */}
        <div className="gallery-header text-center">
          <h1 className="mb-4">Photo Gallery</h1>
          <p className="text-lead">
            Browse and download high-resolution wedding photos
          </p>
        </div>

        {/* ================= CAROUSEL ================= */}
        <header className="gallery-header-carousel">
          {randomCarouselPhotos.length > 0 && (
            <div className="carousel-frame">
              <img
                src={randomCarouselPhotos[carouselIndex].imageUrl}
                alt={randomCarouselPhotos[carouselIndex].title}
                className="carousel-header-image"
              />
              <div className="header-carousel-title">
                {randomCarouselPhotos[carouselIndex].title}
              </div>
            </div>
          )}
        </header>

        {/* ================= PROFESSIONAL PHOTOS ================= */}
        <h2 className="gallery-section-title">
          Professional Photos
        </h2>

        <div className="professional-grid mb-12">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="popup-photo-wrapper"
              onClick={() => openModal(index, "photos")}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                openModal(index, "photos")
              }
              role="button"
              tabIndex={0}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="grid-image"
              />
              <div className="photo-title-overlay">
                {photo.title}
              </div>
            </div>
          ))}
        </div>

        {/* ================= RAW PHOTOS ================= */}
        <h2 className="gallery-section-title">
          Raw Photos
        </h2>

        <div className="professional-grid mb-12">
          {filteredRawPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="popup-photo-wrapper"
              onClick={() => openModal(index, "raw")}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                openModal(index, "raw")
              }
              role="button"
              tabIndex={0}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="grid-image"
              />
              <div className="photo-title-overlay">
                {photo.title}
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-end-message">
          That's all the photos for now 💖
        </div>

        {/* ================= QUICK NAV ================= */}
        <div className="quick-nav-wrapper">
          <div className="quick-nav-message">
            Explore more sections:
          </div>

          <section className="quick-nav about-quick-nav">
            <Link to="/" className="nav-card">
              <h3>🏠 Home</h3>
              <p>Back to Home</p>
            </Link>

            <Link to="/videos" className="nav-card">
              <h3>🎬 Videos</h3>
              <p>Watch films</p>
            </Link>

            <Link to="/about" className="nav-card">
              <h3>💍 Our Story</h3>
              <p>Read about us</p>
            </Link>

            <Link to="/contact" className="nav-card">
              <h3>📩 Contact</h3>
              <p>Send wishes</p>
            </Link>
          </section>
        </div>

        {/* ================= MODAL ================= */}
        {modalOpen && activePhotos.length > 0 && (
          <div
            className="image-modal-backdrop"
            onClick={closeModal}
          >
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-x"
                onClick={closeModal}
              >
                ✕
              </button>

              <img
                src={activePhotos[activeIndex].imageUrl}
                alt={activePhotos[activeIndex].title}
                className="modal-preview-image"
              />

              <h3 className="modal-image-title">
                {activePhotos[activeIndex].title}
              </h3>

              <div className="modal-nav-row">
                <button onClick={prevImage}>‹ Prev</button>
                <button onClick={nextImage}>Next ›</button>
              </div>

              <div className="modal-action-row">
                <a
                  href={
                    activePhotos[activeIndex].downloadUrl
                  }
                  download
                  className="modal-download-btn"
                >
                  ⬇ Download
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    activePhotos[activeIndex].imageUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-whatsapp-share"
                >
                  <FaWhatsapp /> Share
                </a>
              </div>

              <div className="carousel-counter">
                {activeIndex + 1} / {activePhotos.length}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Gallery;
