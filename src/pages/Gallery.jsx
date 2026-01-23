import React, { useState, useMemo, useEffect, useCallback } from "react";
import photos from "../data/photos";
import rawphotos from "../data/rawphotos";
import GalleryCarousel from "../components/Gallery/GalleryCarousel"; 
import GalleryGrid from "../components/Gallery/GalleryGrid";
import ImageModal from "../components/Gallery/ImageModal";
import GalleryQuickNav from "../components/Gallery/GalleryQuickNav";

import "../styles/Gallery.css";

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState("photos");

  const filteredPhotos = useMemo(() => photos, []);
  const filteredRawPhotos = useMemo(() => rawphotos, []);

  const activePhotos =
    currentGallery === "photos"
      ? filteredPhotos
      : filteredRawPhotos;

  const openModal = useCallback((index, type) => {
    setCurrentGallery(type);
    setActiveIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = () => setModalOpen(false);

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === activePhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? activePhotos.length - 1 : prev - 1
    );
  };

  return (
    <main className="gallery-page">
      <section className="app-container py-12">

        <div className="gallery-header text-center">
          <h1>Photo Gallery</h1>
          <p>Browse and download high-resolution wedding photos</p>
        </div>

        <GalleryCarousel photos={photos} />

        <h2 className="gallery-section-title">Professional Photos</h2>
        <GalleryGrid
          photos={filteredPhotos}
          type="photos"
          onOpen={openModal}
        />

        <h2 className="gallery-section-title">All Photos</h2>
        <GalleryGrid
          photos={filteredRawPhotos}
          type="raw"
          onOpen={openModal}
        />

        <div className="gallery-end-message">
          That's all the photos for now 💖
        </div>

        <GalleryQuickNav />

        {modalOpen && (
          <ImageModal
            photos={activePhotos}
            index={activeIndex}
            onClose={closeModal}
            onNext={nextImage}
            onPrev={prevImage}
            setIndex={setActiveIndex}
          />
        )}
      </section>
    </main>
  );
};

export default Gallery;
