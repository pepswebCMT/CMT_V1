import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { auth, db } from "./../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchUserData = async (user) => {
    try {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserDetails(userData);
        setEditedDetails(userData); // Pré-remplir les données pour l'édition
      } else {
        console.log("Aucune donnée utilisateur trouvée.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
        console.log("L'utilisateur n'est pas connecté.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserDetails(null);
      navigate("/home");
      console.log("Utilisateur déconnecté");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };

  const handleBackOffice = () => {
    navigate("/adminpepcatchmytombsw");
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Basculer le mode édition
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, editedDetails); // Mettre à jour dans Firestore
        setUserDetails(editedDetails); // Mettre à jour l'état local
        setIsEditing(false); // Quitter le mode édition
        console.log("Informations mises à jour avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données :", error);
    }
  };

  /* JSX MODIFIÉ */
  return (
    <>
      <Navbar />
      <div className="profile">
        {isLoading ? (
          <p className="profile__loading">Chargement...</p>
        ) : userDetails ? (
          <>
            {userDetails.role === "admin" && (
              <button
                onClick={handleBackOffice}
                className="profile__button profile__button--backoffice"
                style={{ marginBottom: "1rem" }}
              >
                Back Office
              </button>
            )}
            <div className="profile__card">
              <h2 className="profile__title">
                {t("welcome")}, {userDetails.firstName} !
              </h2>
              {isEditing ? (
                <div className="profile__form">
                  <label className="profile__form-label">
                    <strong>Email :</strong>
                    <input
                      type="email"
                      name="email"
                      value={editedDetails.email || ""}
                      onChange={handleInputChange}
                      className="profile__form-input"
                    />
                  </label>
                  <label className="profile__form-label">
                    <strong>{t("first_name")} :</strong>
                    <input
                      type="text"
                      name="firstName"
                      value={editedDetails.firstName || ""}
                      onChange={handleInputChange}
                      className="profile__form-input"
                    />
                  </label>
                  <label className="profile__form-label">
                    <strong>{t("last_name")} :</strong>
                    <input
                      type="text"
                      name="lastName"
                      value={editedDetails.lastName || ""}
                      onChange={handleInputChange}
                      className="profile__form-input"
                    />
                  </label>
                  <div className="profile__form-actions">
                    <button
                      onClick={handleSaveChanges}
                      className="profile__form-button profile__form-button--save"
                    >
                      {t("save")}
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="profile__form-button profile__form-button--cancel"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile__details">
                  <p>
                    <strong>Email :</strong> {userDetails.email}
                  </p>
                  <p>
                    <strong>{t("first_name")} :</strong> {userDetails.firstName}
                  </p>
                  <p>
                    <strong>{t("last_name")} :</strong> {userDetails.lastName}
                  </p>
                </div>
              )}

              {/* Conteneur pour les autres boutons */}
              <div className="profile__button-actions">
                {!isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="profile__button profile__button--edit"
                  >
                    {t("edit_info")}
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="profile__button profile__button--logout"
                >
                  {t("logout")}
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="profile__none">Aucun utilisateur trouvé.</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
