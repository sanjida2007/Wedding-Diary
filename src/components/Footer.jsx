import React from "react";
import { FaHeart } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <FaHeart className="footer-icon" aria-hidden="true" />
          <h3 className="footer-heading">Sayem & Sumona</h3>
        </div>

        <p className="footer-text">
          Thank you for being part of our special journey and beautiful wedding memories.
        </p>

        <div className="footer-divider" />

        <p className="footer-copy">
          Wedding Diary © 2026 – Crafted with love by Sayem
        </p>
      </div>
    </footer>
  );
};

export default Footer;
