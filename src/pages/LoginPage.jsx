// import React, { useState, useNavigate } from "react";
// import Navbar from "../components/Navbar";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { toast } from "react-toastify";
// import { auth } from "./../firebase-config";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const enteredPassword = password; // Stockez temporairement
//     setPassword(""); // Effacez immédiatement après

//     try {
//       await signInWithEmailAndPassword(auth, email, enteredPassword);
//       console.log("L'utilisateur est connecté");
//       window.location.href = "/profile";
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Navbar />
//         <div className="login">
//           <h3>Connexion</h3>
//           <div className="login__container">
//             <label className="login__label">Email</label>
//             <input
//               type="text"
//               className="login__input"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="login__container">
//             <label className="login__label">Password</label>
//             <input
//               type="password"
//               className="login__input"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <button type="submit" className="submit">
//               Connexion
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase-config";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore
import { db } from "../firebase-config"; // Assurez-vous d'importer votre Firestore config
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          navigate("/adminpepcatchmytombsw");
        } else {
          toast.success("Connexion utilisateur réussie", {
            position: "top-center",
          });
          navigate("/profile"); // Redirigez les utilisateurs normaux
        }
      } else {
        throw new Error("Utilisateur introuvable");
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error.message);
      toast.error("Erreur de connexion : vérifiez vos identifiants", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Navbar />
        <div className="login">
          <h3 className="login__title">Connexion</h3>
          <div className="login__container">
            <label className="login__label">Email</label>
            <input
              type="text"
              className="login__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__container">
            <label className="login__label">Password</label>
            <input
              type="password"
              className="login__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="submit">
              Connexion
            </button>
          </div>
          <p>
            Pas encore inscrit ?{" "}
            <a
              onClick={() => navigate("/register")}
              className="login__a"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Inscrit toi
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
