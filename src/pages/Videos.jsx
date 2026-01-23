import React from "react";
import PropTypes from "prop-types";
import videos from "../data/videos";
import VideoCard from "../components/Video/VideoCard";
import { FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "../styles/Videos.css";

const Videos = () => {
  const isVideoListValid = Array.isArray(videos) && videos.length > 0;

  return (
    <section className="videos-section">
      {/* ===== HEADER ===== */}
      <header className="videos-header">
        <h2 className="videos-title">
          <FaVideo className="videos-header-icon" aria-hidden="true" />
          Wedding Films Portfolio
        </h2>
        <p className="videos-subtitle">
          A curated showcase of our latest wedding cinematography
        </p>
      </header>

      {/* ===== VIDEO GRID ===== */}
      {isVideoListValid ? (
        <div
          className="video-grid"
          role="list"
          aria-label="Wedding video portfolio grid"
        >
          {videos.map((videoItem) => (
            <div key={videoItem.id} role="listitem">
              <VideoCard video={videoItem} />
            </div>
          ))}
        </div>
      ) : (
        <div className="videos-empty-state">
          <p>No portfolio videos are currently available.</p>
        </div>
      )}

      {/* ===== QUICK NAVIGATION ===== */}
      <div className="quick-nav-wrapper">
        <div className="quick-nav-message">
          Explore more sections of our wedding celebration:
        </div>
        <section className="quick-nav about-quick-nav">
          <Link to="/" className="nav-card">
            <h3>🏠 Home</h3>
            <p>Back to Home</p>
          </Link>
          <Link to="/gallery" className="nav-card">
            <h3>📸 Gallery</h3>
            <p>View our photos</p>
          </Link>
          <Link to="/about" className="nav-card">
            <h3>💍 Our Story</h3>
            <p>Read about us</p>
          </Link>
          <Link to="/contact" className="nav-card">
            <h3>📩 Contact</h3>
            <p>Send your wishes</p>
          </Link>
        </section>
      </div>
    </section>
  );
};

Videos.propTypes = {
  videos: PropTypes.array,
};

export default Videos;
