import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClasses = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <nav aria-label="Main navigation" className="navbar">
        {/* Branding */}
        <motion.div
          className="navbar-brand"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          <FaHeart className="brand-icon" aria-hidden="true" />

          <Link to="/" className="brand-title">
            Sayem & Sumona's Wedding Diary
          </Link>
        </motion.div>

        {/* Hamburger Button (Small Devices Only) */}
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop-menu">
          <li>
            <NavLink to="/" end className={getLinkClasses}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/gallery" className={getLinkClasses}>
              Gallery
            </NavLink>
          </li>

          <li>
            <NavLink to="/videos" className={getLinkClasses}>
              Videos
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="navbar-menu mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className={getLinkClasses}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/gallery"
                  className={getLinkClasses}
                  onClick={closeMenu}
                >
                  Gallery
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/videos"
                  className={getLinkClasses}
                  onClick={closeMenu}
                >
                  Videos
                </NavLink>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
