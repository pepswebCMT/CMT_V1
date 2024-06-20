import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CoverPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const mediaQueryList = window.matchMedia('(display-mode: standalone)');
    setIsAppInstalled(mediaQueryList.matches);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'application a été installée');
          setIsAppInstalled(true);
        } else {
          console.log('L\'utilisateur a annulé l\'installation');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const navigateToStart = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-96 p-5 flex flex-col justify-around items-center">
      <h1 className="w-full font-josefinBold font-bold text-2xl text-center">Welcome to CatchMyTomb, the app that lets you find the resting place of your favourite celebrities!!!</h1>
      <button className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl" onClick={navigateToStart}>
        Get start
      </button>
      {!isAppInstalled && deferredPrompt && (
        <button className="w-1/2 max-w-80 p-2 text-xl font-bold bg-mandarin-100 dark:bg-mandarin-600 text-white rounded-xl relative" onClick={handleInstall}>
          Install App
        </button>
      )}
    </div>
  );
};

export default CoverPage;
