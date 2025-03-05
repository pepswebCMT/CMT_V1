// // ResetPassword.js
// import React, { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth, db } from "./../firebase-config";
// import Navbar from "../components/Navbar";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMessage(
//         "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception."
//       );
//       setError("");
//     } catch (err) {
//       setError("Erreur lors de l'envoi de l'email : " + err.message);
//       setMessage("");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="reset-password">
//         <div className="reset-password__container">
//           <h2 className="reset-password__title">
//             Réinitialiser votre mot de passe
//           </h2>
//           <form className="reset-password__form" onSubmit={handleSubmit}>
//             <div className="reset-password__container2">
//               <label className="reset-password__label">Adresse email :</label>
//               <input
//                 type="email"
//                 className="reset-password__input"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="reset-password__button">
//               Envoyer
//             </button>
//           </form>
//           {message && (
//             <p className="reset-password__message reset-password__message--success">
//               {message}
//             </p>
//           )}
//           {error && (
//             <p className="reset-password__message reset-password__message--error">
//               {error}
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase-config";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setSuccessMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception."
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error.message);
      if (error.code === "auth/invalid-email") {
        setEmailError("Adresse email invalide");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("Aucun compte associé à cet email");
      } else {
        toast.error("Erreur lors de la réinitialisation du mot de passe", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="login">
          <h3 className="login__title">Réinitialiser le mot de passe</h3>

          <div className="login__container">
            <label className="login__label">Email</label>
            <input
              type="email"
              className="login__input"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setSuccessMessage("");
              }}
              required
            />
            {emailError && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                }}
              >
                {emailError}
              </p>
            )}
          </div>

          {successMessage && (
            <p
              style={{
                color: "green",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
                textAlign: "center",
              }}
            >
              {successMessage}
            </p>
          )}

          <div>
            <button type="submit" className="submit">
              Envoyer le lien de réinitialisation
            </button>
          </div>

          <p>
            <a
              onClick={() => navigate("/login")}
              className="login__a"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Retour à la connexion
            </a>
          </p>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
