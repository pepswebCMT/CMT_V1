import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const CoverPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { t } = useTranslation(); // Hook for translations

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Capture the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const navigateToStart = () => {
    navigate("/home"); // Function to navigate to the home page
  };

  return (
    <section className="w-full pt-28 dark:bg-dark-200 font-josefin">
      <Navbar />
      <div className="w-full h-96 p-5 flex flex-col justify-around items-center">
        <h1 className="w-full font-josefinBold font-bold text-2xl text-center">
          {t("cover_welcome")} {/* Translated welcome message */}
        </h1>
        <button
          className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl"
          onClick={navigateToStart}
        >
          {t("cover_browse")} {/* Translated button text */}
        </button>
        {isInstallable && (
          <button
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-green-500 text-white rounded-xl mt-4"
            onClick={handleInstallClick}
          >
            {t("cover_app")} {/* Translated install button text */}
          </button>
        )}
      </div>
    </section>
  );
};

export default CoverPage;
