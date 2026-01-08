import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const getLinkClasses = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar-header">
      <nav className="navbar">
        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* Branding */}
        <motion.div
          className="navbar-brand"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          <FaHeart className="brand-icon" />
          <Link to="/" className="brand-title">
            Sayem & Sumona's Wedding Diary
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop-menu">
          <li><NavLink to="/" end className={getLinkClasses}>Home</NavLink></li>
          <li><NavLink to="/gallery" className={getLinkClasses}>Gallery</NavLink></li>
          <li><NavLink to="/videos" className={getLinkClasses}>Videos</NavLink></li>
          <li><NavLink to="/about" className={getLinkClasses}>About</NavLink></li>
          <li><NavLink to="/contact" className={getLinkClasses}>Contact Us</NavLink></li>
        </ul>
      </nav>

      {/* Mobile Slide Menu */}
      <div className={`mobile-overlay ${open ? "show" : ""}`} onClick={closeMenu} />

      <aside className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={closeMenu}>
          <FaTimes />
        </button>

        <NavLink to="/" end className={getLinkClasses} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/gallery" className={getLinkClasses} onClick={closeMenu}>Gallery</NavLink>
        <NavLink to="/videos" className={getLinkClasses} onClick={closeMenu}>Videos</NavLink>
        <NavLink to="/about" className={getLinkClasses} onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" className={getLinkClasses} onClick={closeMenu}>Contact Us</NavLink>
      </aside>
    </header>
  );
};

export default Navbar;
