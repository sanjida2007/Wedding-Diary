import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import "../styles/PhotoCard.css";


const PhotoCard = ({ photo, onPreview }) => {
  const handleDownload = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.article
      className="photo-card"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onPreview}
      tabIndex={0}
      role="button"
      aria-label={`Open preview of ${photo.title}`}
      onKeyDown={(e) => e.key === "Enter" && onPreview()}
    >
      <div className="photo-card-image-wrapper">
        <img
          src={photo.imageUrl}
          alt={photo.title || "Wedding photo"}
          loading="lazy"
          decoding="async"
          className="photo-card-image"
        />
      </div>

      <header className="photo-card-header">
        <h3 className="photo-card-title">{photo.title}</h3>
      </header>

      <footer className="photo-card-footer">
        <a
          href={photo.downloadUrl}
          download
          className="photo-card-download-btn"
          onClick={handleDownload}
          aria-label={`Download ${photo.title}`}
        >
          <FaDownload className="download-icon" />
          <span>Download</span>
        </a>
      </footer>
    </motion.article>
  );
};

export default PhotoCard;
