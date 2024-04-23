import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/coverPage.css';

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  let deferredPrompt;

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(display-mode: standalone)');
    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      setIsAppInstalled(false);
      
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        showInstallButton();
      });
    }
  }, []);

  const showInstallButton = () => {
    const installButton = document.querySelector('.install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', handleInstall);
    }
  };

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
        deferredPrompt = null;
      });
    }
  };

  const navigateToStart = () => {
    navigate('/');
  }

  return (
    <div className="cover-page">
      <h1>Welcome to CatchMyTomb, the app that lets you find the resting place of your favourite celebrities!!!</h1>
      <button className="get-started-button" onClick={navigateToStart}>
        Get start
      </button>
      {!isAppInstalled && (
        <button className="install-button" style={{ display: 'none' }}>
          Install App
        </button>
      )}
    </div>
  );
};

export default CoverPage;
