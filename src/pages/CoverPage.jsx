import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import { FaQuestionCircle } from 'react-icons/fa';

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
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

  const handleHelp = () => {
    setShowHelpDialog(true);
  };

  const handleCloseHelpDialog = () => {
    setShowHelpDialog(false);
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
        {!isAppInstalled && (
          <button
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-mandarin-100 dark:bg-mandarin-600 text-white rounded-xl relative" // Ajouter relative pour le positionnement relatif
            onClick={handleInstall}
          >
            {t("cover_app")}
            <FaQuestionCircle size={24} onClick={handleHelp} style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer' }} />
          </button>
        )}
      </div>

      {showHelpDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg text-center">
            <h2 className="text-lg font-bold mb-2">Installation de l'application</h2>
            <p className="text-lg mb-4">
              Si vous avez des problèmes avec le bouton, vous pouvez ouvrir le menu de votre navigateur en cliquant sur les 3 points situés en haut à droite de votre navigateur et sélectionner "Ajouter à l'écran d'accueil" ou "Installer l'application".
            </p>
            <button onClick={handleCloseHelpDialog} className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-auto block">Fermer</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoverPage;
