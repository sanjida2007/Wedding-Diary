import { FaWhatsapp } from "react-icons/fa";

const ImageModal = ({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}) => {
  return (
    <div className="image-modal-backdrop" onClick={onClose}>
      <div
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-x" onClick={onClose}>
          ✕
        </button>

        <img
          src={photos[index].imageUrl}
          alt={photos[index].title}
          className="modal-preview-image"
        />

        <h3 className="modal-image-title">
          {photos[index].title}
        </h3>

        <div className="modal-nav-row">
          <button onClick={onPrev}>‹ Prev</button>
          <button onClick={onNext}>Next ›</button>
        </div>

        <div className="modal-action-row">
          <a
            href={photos[index].downloadUrl}
            download
            className="modal-download-btn"
          >
            ⬇ Download
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              photos[index].imageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-whatsapp-share"
          >
            <FaWhatsapp /> Share
          </a>
        </div>

        <div className="carousel-counter">
          {index + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
