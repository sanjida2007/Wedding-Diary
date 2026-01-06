import React from "react";
import PropTypes from "prop-types";
import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { FaVideo } from "react-icons/fa";
import "../styles/Videos.css";

const Videos = () => {
  const isVideoListValid = Array.isArray(videos) && videos.length > 0;

  return (
    <section className="videos-section">
      <header className="videos-header">
        <h2 className="videos-title">
          <FaVideo className="videos-header-icon" aria-hidden="true" />
          Wedding Films Portfolio
        </h2>

        <p className="videos-subtitle">
          A curated showcase of our latest wedding cinematography
        </p>
      </header>

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
    </section>
  );
};

Videos.propTypes = {
  videos: PropTypes.array
};

export default Videos;
