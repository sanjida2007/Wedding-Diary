import React from "react";

const DriveVideoPlayer = ({ url }) => {
  return (
    <iframe
      src={url}
      width="100%"
      height="450"
      allow="autoplay"
      allowFullScreen
      title="Google Drive Video Player"
      className="rounded-md border"
    ></iframe>
  );
};

export default DriveVideoPlayer;
