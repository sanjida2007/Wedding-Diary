import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import "../styles/VideoCarousel.css";
import "../styles/VideoModal.css";


const AUTOPLAY_DELAY = 5000;

const tryDriveDirect = (url) => {
  // If url already contains uc?export=, return as-is
  if (!url) return null;
  try {
    if (/uc\?export=/.test(url)) return url;
    // file/d/ID/... pattern
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    // id=ID query
    const q = url.match(/[?&]id=([^&]+)/);
    if (q && q[1]) return `https://drive.google.com/uc?export=view&id=${q[1]}`;
    return url;
  } catch {
    return url;
  }
};

const getYouTubePoster = (videoUrl) => {
  if (!videoUrl) return "";
  const match = videoUrl.match(/\/embed\/([\w-]+)/) || videoUrl.match(/v=([\w-]+)/);
  if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return "";
};

const placeholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'><rect width='100%' height='100%' fill='#000'/><g fill='#334155' font-family='Arial, Helvetica, sans-serif'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20'>No preview available</text></g></svg>`
  );

const VideoModal = ({ open, onClose, videoUrl, shareUrl, onCopyLink, showCopied }) => {
  if (!open) return null;

  return (
    <div className="video-modal-overlay" onMouseDown={onClose}>
      <div
        className="video-modal"
        onMouseDown={(e) => e.stopPropagation()}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <button className="video-modal-close" onClick={onClose} tabIndex={0} aria-label="Close">
          ×
        </button>

        <div className="modal-video-frame">
          <iframe
            src={videoUrl}
            title="Wedding Film"
            allowFullScreen
            allow="autoplay; encrypted-media; fullscreen"
          />
        </div>

        <div className="modal-share-row">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-share-btn whatsapp"
          >
            <FaWhatsapp className="icon" />
            Share
          </a>
          <button className="modal-share-btn copy" onClick={onCopyLink} aria-label="Copy link">
            <FiCopy className="icon" />
            Copy link
          </button>
        </div>

        {showCopied && <div className="copy-success-msg">Link is copied to your clipboard.</div>}
      </div>
    </div>
  );
};

const VideoCarousel = ({ videos = [] }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [posterUrl, setPosterUrl] = useState(placeholder);
  const loadAttemptRef = useRef(0);

  const autoplayRef = useRef(null);
  const isHovered = useRef(false);

  const nextVideo = useCallback(() => setVideoIndex((prev) => (prev + 1) % videos.length), [
    videos.length,
  ]);
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
    if (modalOpen) {
      clearInterval(autoplayRef.current);
      return;
    }
    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [videos.length, nextVideo, modalOpen]);

  // block keys while modal open
  useEffect(() => {
    const blockKeys = (e) => {
      if (!modalOpen) return;
      if (["ArrowLeft", "ArrowRight", "PageDown", "PageUp"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", blockKeys, true);
    return () => window.removeEventListener("keydown", blockKeys, true);
  }, [modalOpen]);

  // prevent background scroll
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const node = document.querySelector(".video-modal");
        if (node) node.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Handle thumbnail loading with fallbacks
  useEffect(() => {
    if (!videos.length) {
      setPosterUrl(placeholder);
      return;
    }
    const current = videos[videoIndex];
    loadAttemptRef.current = 0;

    const tryUrls = () => {
      const urls = [];
      if (current.thumbnail) urls.push(current.thumbnail);

      // If thumbnail appears to be a Drive preview/view link, attempt direct uc?export=view and export=download forms
      if (current.thumbnail && current.thumbnail.includes("drive.google.com")) {
        const direct = tryDriveDirect(current.thumbnail);
        if (direct && !urls.includes(direct)) urls.push(direct);
        // also try download variant (sometimes works differently)
        const downloadVariant = direct?.replace("export=view", "export=download") || null;
        if (downloadVariant) urls.push(downloadVariant);
      }

      // try YouTube poster fallback
      const yt = getYouTubePoster(current.videoUrl);
      if (yt) urls.push(yt);

      // final fallback placeholder
      urls.push(placeholder);
      return urls;
    };

    const urls = tryUrls();

    let cancelled = false;
    const loadNext = () => {
      if (cancelled) return;
      if (loadAttemptRef.current >= urls.length) {
        setPosterUrl(placeholder);
        return;
      }
      const url = urls[loadAttemptRef.current++];
      const img = new Image();
      // don't set crossOrigin for Drive images; they often 403/CORS — rely on onerror fallback
      img.onload = () => {
        if (cancelled) return;
        setPosterUrl(url);
      };
      img.onerror = () => {
        // try next candidate
        loadNext();
      };
      // Small guard: if url is empty, skip
      if (!url) {
        loadNext();
        return;
      }
      img.src = url;
    };

    loadNext();

    return () => {
      cancelled = true;
    };
  }, [videoIndex, videos]);

  const openModal = () => {
    setCopied(false);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCopy = () => {
    const url = videos[videoIndex]?.videoUrl || "";
    if (navigator.clipboard && url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!videos.length) {
    return (
      <div className="film-empty">
        <p>Our wedding films will be uploaded shortly</p>
      </div>
    );
  }

  const current = videos[videoIndex];

  return (
    <article className="section-card video-carousel">
      <h2 className="section-title cinematic-title">Wedding Cinematic Films</h2>

      <div
        className="carousel-container"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <div className="video-wrapper">
          <div
            className="video-frame with-popup"
            role="button"
            tabIndex={0}
            aria-label="Open video"
            onClick={openModal}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal()}
          >
            <div className="play-overlay" />
            <img
              src={posterUrl}
              className="video-thumb"
              alt={current.title}
              draggable={false}
              onError={(e) => {
                // final fallback if browser couldn't render the chosen poster
                e.currentTarget.src = placeholder;
              }}
            />
          </div>

          <h3 className="film-title">{current.title}</h3>
          <p className="film-description">
            {current.description ||
              "Relive the atmosphere and emotion through this carefully crafted wedding film."}
          </p>

          <nav className="carousel-controls film-nav">
            <button onClick={prevVideo} aria-label="Previous video" disabled={modalOpen}>
              ‹ Prev Film
            </button>
            <button onClick={nextVideo} aria-label="Next video" disabled={modalOpen}>
              Next Film ›
            </button>
          </nav>

          <footer className="carousel-counter">
            {videoIndex + 1} of {videos.length}
          </footer>

          <div className="film-share-buttons">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(current.videoUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <FaWhatsapp /> Share
            </a>
          </div>
        </div>
      </div>

      <div className="center-btn">
        <a href="/videos" className="glass-btn-full">
          ⬇ Watch All Films
        </a>
      </div>

      <VideoModal
        open={modalOpen}
        onClose={closeModal}
        videoUrl={current.videoUrl}
        shareUrl={current.videoUrl}
        onCopyLink={handleCopy}
        showCopied={copied}
      />
    </article>
  );
};

export default VideoCarousel;