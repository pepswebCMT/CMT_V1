import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/coverPage.css';

const CoverPage = () => {
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const navigate = useNavigate();
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(display-mode: standalone)');
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      console.log('beforeinstallprompt event was fired.');
      deferredPrompt.current = event;
      if (!isAppInstalled) {
        showInstallButton();
      }
    };

    if (mediaQueryList.matches) {
      setIsAppInstalled(true);
    } else {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, [isAppInstalled]);

  const showInstallButton = () => {
    const installButton = document.querySelector('.install-button');
    if (installButton) {
      installButton.style.display = 'block';
    }
  };

  const handleInstallClick = () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          setIsAppInstalled(true);
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt.current = null;
      });
    }
  };

  const navigateToStart = () => {
    navigate('/');
  };

  return (
    <div className="cover-page">
      <h1>Welcome to Catch My Tomb</h1>
      <button className="get-started-button" onClick={navigateToStart}>
        Get Started
      </button>
      {!isAppInstalled && (
        <button className="install-button" onClick={handleInstallClick} style={{ display: 'none' }}>
          Install App
        </button>
      )}
    </div>
  );
};

export default CoverPage;
