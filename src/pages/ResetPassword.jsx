// ResetPassword.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "./../firebase-config";
import Navbar from "../components/Navbar";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception."
      );
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email : " + err.message);
      setMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="reset-password">
        <div className="reset-password__container">
          <h2 className="reset-password__title">
            Réinitialiser votre mot de passe
          </h2>
          <form className="reset-password__form" onSubmit={handleSubmit}>
            <label className="reset-password__label">
              Adresse email :
              <input
                type="email"
                className="reset-password__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="reset-password__button">
              Envoyer
            </button>
          </form>
          {message && (
            <p className="reset-password__message reset-password__message--success">
              {message}
            </p>
          )}
          {error && (
            <p className="reset-password__message reset-password__message--error">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
