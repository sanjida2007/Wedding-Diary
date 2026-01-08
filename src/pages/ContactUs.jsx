import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/ContactUs.css";
import { FaEnvelope, FaUser, FaPenFancy, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ContactUs = () => {
  const formRef = useRef();
  const [popup, setPopup] = useState({ show: false, success: true });

  const closePopup = () => setPopup({ ...popup, show: false });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mtqntin",
        "template_j2o8z3n",
        formRef.current,
        "xp2YaDzzy4jRLVHXj"
      )
      .then(
        () => {
          setPopup({ show: true, success: true });
          formRef.current.reset();
        },
        () => {
          setPopup({ show: true, success: false });
        }
      );
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Send your wishes or messages to <b>Sayem & Sumona</b> 💍
          </p>
          <p>We would love to hear from you. Share your wishes, questions, or
            messages with us 💖
          </p>
        </div>

        <div className="contact-card">
          <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label><FaUser /> Your Name <span className="required">*</span></label>
              <input type="text" name="name" required />
            </div>

            <div className="form-group">
              <label><FaUser /> Email <span className="required">*</span></label>
              <input type="email" name="email" required />
            </div>

            <div className="form-group">
              <label><FaEnvelope /> Subject</label>
              <input type="text" name="title" />
            </div>

            <div className="form-group">
              <label><FaUser /> Message <span className="required">*</span></label>
              <textarea name="message" required />
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-card ${popup.success ? "success" : "error"}`}>
            {popup.success ? (
              <>
                <FaCheckCircle className="popup-icon success-icon" />
                <h3>Message Sent Successfully 💖</h3>
                <p>Thank you for your message. We truly appreciate it.</p>
              </>
            ) : (
              <>
                <FaTimesCircle className="popup-icon error-icon" />
                <h3>Failed to Send Message</h3>
                <p>Please try again after some time.</p>
              </>
            )}

            <button className="popup-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
