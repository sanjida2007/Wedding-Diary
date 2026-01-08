import React from "react";
import "../styles/ContactUs.css";
import { FaEnvelope, FaUser, FaPenFancy } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            We would love to hear from you.  
            Share your wishes, questions, or messages with us 💖
          </p>
        </div>

        {/* Card */}
        <div className="contact-card">
          <form className="contact-form">
            <div className="form-group">
              <label>
                <FaUser /> Your Name
              </label>
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope /> Email Address
              </label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>
                <FaPenFancy /> Message
              </label>
              <textarea placeholder="Write your message or wishes here..." />
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
