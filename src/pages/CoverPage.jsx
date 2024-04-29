import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt.current = event;
        setIsAppInstalled(false); // L'application n'est pas encore installée
      });

      return () => {
        window.removeEventListener("beforeinstallprompt", (event) => {
          deferredPrompt.current = null;
        });
      };
    }
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
    <section className="w-full pt-28">
      <Navbar />
      <Modal />
      <div className="w-full h-96 p-5 flex flex-col justify-around items-center">
        <h1 className="w-full font-bold text-2xl text-justify">
          Welcome to CatchMyTomb, the app that lets you find the resting place
          of your favourite celebrities!
        </h1>
        <button
          className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl"
          onClick={navigateToStart}
        >
          Start browsing
        </button>
        {!isAppInstalled && (
          <button
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-mandarin text-white rounded-xl"
            onClick={handleInstall}
          >
            Install App
          </button>
        )}
      </div>
    </section>
  );
};

export default CoverPage;
