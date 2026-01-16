import React from "react";
import { FaHeart } from "react-icons/fa";
import "../styles/Footer.css";
import InstallApp from "../components/InstallApp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-brand">
          <FaHeart className="footer-icon" aria-hidden="true" />
          <h3 className="footer-heading">Sayem & Sumona</h3>
        </div>

        {/* Main Text */}
        <p className="footer-text">
          Thank you for being part of our special journey and beautiful wedding memories.
        </p>

        {/* Animated Gradient Divider */}
        <div className="footer-divider" />

        {/* Copyright */}
        <p className="footer-copy">
          Wedding Diary © 2026 – Crafted with love by Sayem
        </p>
      </div>

      {/* Mobile Install Button */}
      <div className="mobile-install-wrapper">
        <InstallApp variant="menu" />
      </div>
    </footer>
  );
};

export default Footer;
