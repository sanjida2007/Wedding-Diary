import { useEffect, useState } from "react";

const GalleryCarousel = ({ photos }) => {
  const [index, setIndex] = useState(0);
  const [randomPhotos, setRandomPhotos] = useState([]);

  useEffect(() => {
    setRandomPhotos([...photos].sort(() => 0.5 - Math.random()));
  }, [photos]);

  useEffect(() => {
    if (!randomPhotos.length) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === randomPhotos.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [randomPhotos]);

  if (!randomPhotos.length) return null;

  return (
    <header className="gallery-header-carousel">
      <div className="carousel-frame">
        <img
          src={randomPhotos[index].imageUrl}
          alt={randomPhotos[index].title}
          className="carousel-header-image"
        />
        <div className="header-carousel-title">
          {randomPhotos[index].title}
        </div>
      </div>
    </header>
  );
};

export default GalleryCarousel;
