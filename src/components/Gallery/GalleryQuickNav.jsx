import { Link } from "react-router-dom";

const GalleryQuickNav = () => {
  return (
    <div className="quick-nav-wrapper">
      <div className="quick-nav-message">
        Explore more sections:
      </div>

      <section className="quick-nav about-quick-nav">
        <Link to="/" className="nav-card">
          <h3>🏠 Home</h3>
          <p>Back to Home</p>
        </Link>

        <Link to="/videos" className="nav-card">
          <h3>🎬 Videos</h3>
          <p>Watch films</p>
        </Link>

        <Link to="/about" className="nav-card">
          <h3>💍 Our Story</h3>
          <p>Read about us</p>
        </Link>

        <Link to="/contact" className="nav-card">
          <h3>📩 Contact</h3>
          <p>Send wishes</p>
        </Link>
      </section>
    </div>
  );
};

export default GalleryQuickNav;
