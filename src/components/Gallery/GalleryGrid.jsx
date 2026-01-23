const GalleryGrid = ({ photos, type, onOpen }) => {
  return (
    <div className="professional-grid mb-12">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="popup-photo-wrapper"
          onClick={() => onOpen(index, type)}
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
  );
};

export default GalleryGrid;
