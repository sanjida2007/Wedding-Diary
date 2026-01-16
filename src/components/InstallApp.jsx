import React, { useEffect, useState } from "react";
import "../styles/InstallApp.css";

const InstallApp = ({ variant = "fixed" }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // prevent browser auto popup
      setDeferredPrompt(e); // store for later
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!canInstall) return null;

  const openCustomPopup = () => {
    setShowPopup(true);
  };

  const handleConfirmInstall = async () => {
    if (!deferredPrompt) return;

    // show browser's install prompt only now
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setCanInstall(false);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  /* ===== MOBILE MENU BUTTON ===== */
  if (variant === "menu") {
    return (
      <>
        <button className="menu-install-btn" onClick={openCustomPopup}>
          📲 Download App
        </button>

        {showPopup && (
          <div className="install-popup-overlay">
            <div className="install-popup">
              <h4>📲 Install Wedding App?</h4>
              <p>Fast, offline, fullscreen experience for your wedding diary.</p>
              <div className="popup-btns">
                <button className="popup-install-btn" onClick={handleConfirmInstall}>
                  Install
                </button>
                <button className="popup-cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  /* ===== INSTALL FIXED BAR ===== */
  return (
    <>
      <div className="install-position">
        <div className="install-text">
          <span>📲</span>
          <div>
            <strong>Install Wedding App</strong>
            <small>Fast • Offline • Fullscreen</small>
          </div>
        </div>
        <button className="install-btn" onClick={openCustomPopup}>
          Install
        </button>
      </div>

      {showPopup && (
        <div className="install-popup-overlay">
          <div className="install-popup">
            <h4>📲 Install Wedding App?</h4>
            <p>Fast, offline, fullscreen experience for your wedding diary.</p>
            <div className="popup-btns">
              <button className="popup-install-btn" onClick={handleConfirmInstall}>
                Install
              </button>
              <button className="popup-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallApp;
