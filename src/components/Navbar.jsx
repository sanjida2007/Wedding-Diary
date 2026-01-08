import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const getLinkClasses = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

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

        {/* Menu (always visible) */}
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
          
          <li>
            <NavLink to="/contact" className={getLinkClasses}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
