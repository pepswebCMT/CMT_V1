// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "./../firebase-config";
// import Navbar from "../components/Navbar";
// import { setDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";

// function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       // Crée un utilisateur avec Firebase Authentication
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;

//       if (user) {
//         // Ajoute les informations de l'utilisateur dans Firestore avec un rôle
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: fname,
//           lastName: lname,
//           role: "user", // Définit un rôle par défaut, peut être changé plus tard
//           createdAt: new Date().toISOString(),
//         });
//       }

//       console.log("Utilisateur enregistré avec succès");
//       toast.success("Utilisateur créé avec succès", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error.message);
//       toast.error("Erreur lors de l'inscription : " + error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <form onSubmit={handleRegister}>
//         <div className="register">
//           <h3 className="register__title">{t("registration")}</h3>
//           <div className="register__container">
//             <label className="register__label">{t("firstname")}</label>
//             <input
//               type="text"
//               placeholder={t("firstname")}
//               onChange={(e) => setFname(e.target.value)}
//               required
//               className="register__input"
//             />
//           </div>
//           <div className="register__container">
//             <label className="register__label">{t("lastname")}</label>
//             <input
//               type="text"
//               placeholder={t("lastname")}
//               onChange={(e) => setLname(e.target.value)}
//               required
//               className="register__input"
//             />
//           </div>
//           <div className="register__container">
//             <label className="register__label">Email</label>
//             <input
//               type="email"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="register__input"
//             />
//           </div>
//           <div className="register__container">
//             <label className="register__label">{t("password")}</label>
//             <input
//               type="password"
//               placeholder={t("password")}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="register__input"
//             />
//           </div>
//           <div>
//             <button type="submit" className="submit">
//               {t("registration")}{" "}
//             </button>
//           </div>
//           <p>
//             {t("alreadyregistered")}{" "}
//             <a
//               onClick={() => navigate("/login")}
//               className="register__a"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//             >
//               {t("log_in")}{" "}
//             </a>
//           </p>
//         </div>
//       </form>
//     </>
//   );
// }

// export default RegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      // Création de l'utilisateur avec Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        // Ajout des informations de l'utilisateur dans Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          role: "user",
          createdAt: new Date().toISOString(),
        });
      }

      console.log("Utilisateur enregistré avec succès");
      toast.success("Utilisateur créé avec succès", {
        position: "top-center",
      });
      navigate("/profile"); // Redirection après inscription
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);

      // Gestion des erreurs Firebase
      if (error.code === "auth/invalid-email") {
        setEmailError("Adresse email invalide");
      } else if (error.code === "auth/email-already-in-use") {
        setEmailError("Cet email est déjà utilisé");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      } else {
        toast.error("Erreur lors de l'inscription : " + error.message, {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleRegister}>
        <div className="register">
          <h3 className="register__title">{t("registration")}</h3>

          <div className="register__container">
            <label className="register__label">{t("firstname")}</label>
            <input
              type="text"
              placeholder={t("firstname")}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="register__input"
            />
          </div>

          <div className="register__container">
            <label className="register__label">{t("lastname")}</label>
            <input
              type="text"
              placeholder={t("lastname")}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="register__input"
            />
          </div>

          <div className="register__container">
            <label className="register__label">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
              className="register__input"
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

          <div className="register__container">
            <label className="register__label">{t("password")}</label>
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
              className="register__input"
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

          <div>
            <button type="submit" className="submit">
              {t("registration")}
            </button>
          </div>

          <p>
            {t("alreadyregistered")}{" "}
            <a
              onClick={() => navigate("/login")}
              className="register__a"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {t("log_in")}
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
