import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-container">
        {/* Text Section */}
        <div className="about-content">
          <h1>Our Love Story</h1>

          <p className="about-intro">
            Our wedding marked the beginning of a beautiful journey together,
            and we are deeply grateful for the love, prayers, and support we
            received from everyone.
          </p>

          <div className="about-details">
            <p>
              <strong>Groom:</strong> Md Aminul Islam Sayem
            </p>
            <p>
              <strong>Bride:</strong> Mashruba Akter Sumona
            </p>
            <p>
              <strong>Wedding Date:</strong> 05 December 2025
            </p>
            <p>
              <strong>Location:</strong> Dhaka, Bangladesh
            </p>
          </div>

          <p className="about-message">
            Our marriage is a celebration of love, friendship, and togetherness.
            Thank you for keeping us in your prayers and for sharing our
            happiness 💖
          </p>
        </div>

        {/* Image Section */}
        <div className="about-image">
          <img
            src="https://drive.google.com/thumbnail?id=1DRzXkvZtDUl_pmGmzE4JCeiLWvhG1-eV&sz=w1000"
            alt="Couple holding hands"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
