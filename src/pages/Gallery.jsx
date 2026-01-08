import React, { useState, useMemo, useEffect, useCallback } from "react";
import photos from "../data/photos";
import "../styles/Gallery.css";

const Gallery = () => {
  const [search] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel states
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [randomCarouselPhotos, setRandomCarouselPhotos] = useState([]);

  // Prepare filtered photos for grid
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Open modal with correct photo index from filtered set
  const openModal = useCallback((index) => {
    setActiveIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = () => setModalOpen(false);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    );
  }, [filteredPhotos]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  }, [filteredPhotos]);

  // Create RANDOM order photos for carousel ONCE
  useEffect(() => {
    const shuffled = [...photos].sort(() => 0.5 - Math.random());
    setRandomCarouselPhotos(shuffled);
  }, []);

  // Auto play effect for carousel
  useEffect(() => {
    if (randomCarouselPhotos.length === 0) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev === randomCarouselPhotos.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [randomCarouselPhotos]);

  // Keyboard support for modal
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
        <div className="gallery-header text-center">
          <h1 className="mb-4">Photo Gallery</h1>

          <p className="text-lead">
            Browse and download high-resolution images from our wedding
            celebration
          </p>
        </div>

        {/* Header Auto Carousel */}
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

        {/* Gallery Grid */}
        <div className="professional-grid mb-12">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="popup-photo-wrapper"
              onClick={() => openModal(index)}
              onKeyDown={(e) => e.key === "Enter" && openModal(index)}
              role="button"
              tabIndex={0}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="grid-image"
              />
              <div className="photo-title-overlay">{photo.title}</div>
            </div>
          ))}
        </div>
        {/* End of Gallery Message */}
        <div className="gallery-end-message">
          That's all the photos for now! 💖
        </div>

        {/* Modal Popup */}
        {modalOpen && filteredPhotos.length > 0 && (
          <div className="image-modal-backdrop" onClick={closeModal}>
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-x" onClick={closeModal}>
                ✕
              </button>

              <img
                src={filteredPhotos[activeIndex].imageUrl}
                alt={filteredPhotos[activeIndex].title}
                className="modal-preview-image"
              />

              <div className="modal-nav-row">
                <button onClick={prevImage}>Previous</button>

                <a
                  href={filteredPhotos[activeIndex].downloadUrl}
                  download
                  className="modal-download-btn"
                >
                  Download
                </a>

                <button onClick={nextImage}>Next</button>
              </div>

              <div className="carousel-counter">
                {activeIndex + 1} / {filteredPhotos.length}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Gallery;
