import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase-config";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore
import { db } from "../firebase-config"; // Assurez-vous d'importer votre Firestore config
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Authentification de l'utilisateur
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = userCredential.user.uid;

      // Récupération des données utilisateur depuis Firestore
      const userDoc = await getDoc(doc(db, "Users", userId)); // Remplacez "users" par le nom de votre collection
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Vérification du rôle
        if (userData.role === "admin") {
          toast.success("Connexion administrateur réussie", {
            position: "top-center",
          });
          navigate("/profile");
        } else {
          toast.success("Connexion utilisateur réussie", {
            position: "top-center",
          });
          navigate("/profile");
        }
      } else {
        throw new Error("Utilisateur introuvable");
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error.message);

      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/user-not-found"
      ) {
        setEmailError("Adresse email invalide ou introuvable");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Mot de passe incorrect");
      } else {
        toast.error("Erreur de connexion : vérifiez vos identifiants", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Navbar />
        <div className="login">
          <h3 className="login__title">{t("connection")}</h3>
          <div className="login__container">
            <label className="login__label">Email</label>
            <input
              type="text"
              className="login__input"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
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
          <div className="login__container">
            <label className="login__label">{t("password")} </label>
            <input
              type="password"
              className="login__input"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                }}
              >
                {passwordError}
              </p>
            )}
          </div>
          <div style={{ textAlign: "left" }}>
            <a
              onClick={() => navigate("/resetpassword")}
              className="login__a"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {t("forgottenpassword")}
            </a>
          </div>
          <div>
            <button type="submit" className="submit">
              {t("connection")}{" "}
            </button>
          </div>
          <p>
            {t("notregisteredyet")}{" "}
            <a
              onClick={() => navigate("/register")}
              className="login__a"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {t("signup")}{" "}
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
