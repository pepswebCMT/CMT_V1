import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  const deferredPrompt = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPrompt.current = event;
      setIsAppInstalled(false);
      console.log("beforeinstallprompt event captured");
    };

    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("L'application a été installée");
          setIsAppInstalled(true);
        } else {
          console.log("L'utilisateur a annulé l'installation");
        }
        deferredPrompt.current = null;
      });
    }
  };

  const navigateToStart = () => {
    navigate("/home");
  };

  return (
    <section className="w-full pt-28 dark:bg-dark-200 font-josefin">
      <Navbar />
      <div className="w-full h-96 p-5 flex flex-col justify-around items-center">
        <h1 className="w-full font-josefinBold font-bold text-2xl text-center">
          {t("cover_welcome")}
        </h1>
        <button
          className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl"
          onClick={navigateToStart}
        >
          {t("cover_browse")}
        </button>
        {!isAppInstalled && deferredPrompt.current && (
          <button
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-mandarin-100 dark:bg-mandarin-600 text-white rounded-xl"
            onClick={handleInstall}
          >
            {t("cover_app")}
          </button>
        )}
      </div>
    </section>
  );
};

export default CoverPage;
