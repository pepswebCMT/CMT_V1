import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/coverPage.css";

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  const deferredPrompt = useRef(null);

  const showInstallButton = useCallback(() => {
    const installButton = document.querySelector(".install-button");
    if (installButton) {
      installButton.style.display = "block";
      installButton.addEventListener("click", handleInstall);
    }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt.current = event;
        showInstallButton();
      });

      return () => {
        window.removeEventListener("beforeinstallprompt", (event) => {
          deferredPrompt.current = null;
        });
      };
    }
  }, [showInstallButton]);

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
    <div className="cover-page">
      <h1>
        Welcome to CatchMyTomb, the app that lets you find the resting place of
        your favourite celebrities!!!
      </h1>
      <button className="get-started-button" onClick={navigateToStart}>
        Get start
      </button>
      {!isAppInstalled && (
        <button className="install-button" style={{ display: "none" }}>
          Install App
        </button>
      )}
    </div>
  );
};

export default CoverPage;
