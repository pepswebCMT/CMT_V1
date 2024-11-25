import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import { FaQuestionCircle } from "react-icons/fa";
import "@khmyznikov/pwa-install";

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
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
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
    <section className="w-full dark:bg-dark-200 font-josefin">
      <pwa-install
        manifest-url="/manifest.json"
        disable-screenshots="true"
        description="Intallez l'application CatchMyTomb"
        install-description="Partez à la découverte des tombes célèbres proches de vous dés maintenant avec l'application CatchMyTomb"
      ></pwa-install>
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
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-mandarin-100 dark:bg-mandarin-600 text-white rounded-xl relative"
            onClick={handleInstall}
          >
            {t("cover_app")}
            <FaQuestionCircle
              size={24}
              onClick={handleHelp}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                cursor: "pointer",
              }}
            />
          </button>
        )}
      </div>

      {showHelpDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center max-w-lg mx-4">
            <h2 className="text-xl font-bold mb-4">
              Installation de l'application
            </h2>
            <div className="text-justify text-lg mb-4 space-y-4">
              <p className="mb-4">
                <span className="font-bold">Pour Android:</span> Ouvrez le menu
                de votre navigateur en cliquant sur les trois points en haut à
                droite, puis sélectionnez{" "}
                <span className="font-bold">"Ajouter à l'écran d'accueil"</span>{" "}
                ou <span className="font-bold">"Installer l'application"</span>.
              </p>
              <p>
                <span className="font-bold">Pour iPhone:</span> Sous Safari,
                appuyez sur l'icône de partage en bas de l'écran (le carré avec
                une flèche vers le haut), puis sélectionnez{" "}
                <span className="font-bold">"Ajouter à l'écran d'accueil"</span>
                .
              </p>
            </div>
            <button
              onClick={handleCloseHelpDialog}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoverPage;
