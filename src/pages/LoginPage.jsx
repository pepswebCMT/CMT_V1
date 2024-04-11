import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import googleIcon from '../assets/icons/search.png';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [rememberMe, setRememberMe] = useState(false); 
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');
  const [googleError, setGoogleError] = useState('');

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (error) setError('');
      if (googleError) setGoogleError('');
    }, 5000);
    
    const confirmationTimeout = setTimeout(() => {
      if (confirmationMessage) setConfirmationMessage('');
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(confirmationTimeout);
    };
  }, [error, googleError, confirmationMessage]);

  const resetForm = () => {
    setCredentials({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') { 
      setRememberMe(checked);
    } else {
      setCredentials({
        ...credentials,
        [name]: value
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(Auth, credentials.email, credentials.password);
      navigate('/home');
    } catch (error) {
      setError('Identifiant ou mot de passe incorrect, veuillez réessayer.');
    }
  };

  const handleSignUp = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(Auth, credentials.email, credentials.password);
      setConfirmationMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
      setError('');
      setTimeout(() => {
        setConfirmationMessage('');
        setIsLoginView(true);
        resetForm();
      }, 5000);
    } catch (error) {
      setError('Informations incorrectes. Vérifiez et réessayez.');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(Auth, provider);
      navigate('/home');
    } catch (error) {
      setGoogleError('Erreur de connexion avec Google. Veuillez réessayer.');
    }
  };

  return (
    <div className="auth-container">
      {isLoginView ? (
        <div className="login-form">
          <h2>Connexion</h2>
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Adresse e-mail"
          />
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
          {error && <p className="error-message">{error}</p>}
          <div className="remember-me-container">
            <input
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={handleInputChange}
            />
            <label htmlFor="rememberMe">Se souvenir de moi</label>
          </div>
          <div className="button-container">
            <button onClick={handleLogin}>Se connecter</button>
          </div>
          <p>
            Vous n'avez pas de compte ? <span onClick={() => setIsLoginView(false)}>S'inscrire</span>
          </p>
          <div className="google-signup" onClick={handleGoogleSignIn}>
            <img src={googleIcon} alt="Google Icon" className="google-icon" />
            Se connecter avec Google
          </div>
          <br /><br />
          <p className="app-description">Trouvez le lieu de repos des défunts <br /> avec Catch my Tomb.</p>
        </div>
      ) : (
        <div className="signup-form">
          <h2>Inscription</h2>
          <input
            name="fullName"
            type="text"
            value={credentials.fullName}
            onChange={handleInputChange}
            placeholder="Nom complet"
          />
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Adresse e-mail"
          />
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
          <input
            name="confirmPassword"
            type="password"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirmer le mot de passe"
          />
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button onClick={handleSignUp}>S'inscrire</button>
          </div>
          <p>
            Vous avez déjà un compte ? <span onClick={() => setIsLoginView(true)}>Se connecter</span>
          </p>
          {confirmationMessage && <p className="success-message">{confirmationMessage}</p>}
        </div>
      )}
      {googleError && <p className="error-message">{googleError}</p>}
    </div>
  );
}

export default LoginPage;
