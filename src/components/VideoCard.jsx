import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";
import DriveVideoPlayer from "./DriveVideoPlayer";
import "../styles/VideoCard.css";

const VideoCard = ({ video }) => {
  const { title, videoUrl } = video;

  return (
    <motion.article
      className="video-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 12
      }}
    >
      <div className="video-card-media">
        <DriveVideoPlayer url={videoUrl} />
      </div>

      <div className="video-card-info">
        <header className="video-card-header">
          <FaVideo className="video-card-icon" aria-hidden="true" />
          <h4 className="video-card-title">{title}</h4>
        </header>
      </div>
    </motion.article>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired
  }).isRequired
};

export default VideoCard;
