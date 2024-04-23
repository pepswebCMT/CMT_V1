import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [rememberMe, setRememberMe] = useState(false); 
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (error) setError('');
    }, 5000);

    const confirmationTimeout = setTimeout(() => {
      if (confirmationMessage) setConfirmationMessage("");
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(confirmationTimeout);
    };

  }, [error, confirmationMessage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        Auth,
        credentials.email,
        credentials.password
      );
      navigate("/admin");
    } catch (error) {
      setError("Identifiant ou mot de passe incorrect, veuillez réessayer.");
    }
  };

  return (
    <div className="auth-container">
        <div className="login-form">
          <h2>Connexion</h2>
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Adresse e-mail"
            required
          />
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            required
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
          <br /><br />
        </div>
    </div>
  );
}

export default LoginPage;
