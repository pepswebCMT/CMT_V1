import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useTranslation } from "react-i18next";

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  const deferredPrompt = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Handler pour capturer l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Empêcher le prompt automatique
      deferredPrompt.current = event; // Stocker l'événement pour un usage ultérieur
      setIsAppInstalled(false); // Mettre à jour l'état pour afficher le bouton d'installation
    };

    // Vérifier si l'application est lancée en mode standalone
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    // Fonction de nettoyage pour retirer l'écouteur
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = () => {
    // Afficher le prompt d'installation stocké
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      // Gérer la décision de l'utilisateur
      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("L'application a été installée");
          setIsAppInstalled(true);
        } else {
          console.log("L'utilisateur a annulé l'installation");
        }
        deferredPrompt.current = null; // Réinitialiser la référence après utilisation
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
        {!isAppInstalled && (
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
