import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "./../firebase-config";
import { doc, getDoc } from "firebase/firestore";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Vérification si l'utilisateur est connecté
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("Aucune donnée utilisateur trouvée.");
        }
      } else {
        console.log("L'utilisateur n'est pas connecté.");
      }
    });
  };

  useEffect(() => {
    fetchUserData(); // Appel de la fonction pour récupérer les données utilisateur
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserDetails(null); // Réinitialiser les détails de l'utilisateur
      window.location.href = "/login"; // Rediriger vers la page de connexion
      console.log("Utilisateur déconnecté");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        {userDetails ? (
          <>
            <h2>Bienvenue {userDetails.firstName}</h2>
            <div>
              <p>Email : {userDetails.email}</p>
              <p>Prénom : {userDetails.firstName}</p>
              <p>Nom : {userDetails.lastName}</p>
            </div>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
