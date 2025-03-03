import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const TombsManagementPage = () => {
  const [tombs, setTombs] = useState([]); // État pour stocker les tombes
  const [loading, setLoading] = useState(true); // État de chargement

  // Récupérer toutes les tombes de la collection NewTombs
  const fetchTombs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "NewTombs"));
      const tombsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTombs(tombsList);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des tombes :", error);
      toast.error("Erreur lors de la récupération des données.");
      setLoading(false);
    }
  };

  // Supprimer une tombe
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tombe ?")) {
      try {
        await deleteDoc(doc(db, "NewTombs", id));
        toast.success("Tomb supprimée avec succès !");
        fetchTombs(); // Rafraîchir la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        toast.error("Erreur lors de la suppression de la tombe.");
      }
    }
  };

  // Charger les tombes au montage du composant
  useEffect(() => {
    fetchTombs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Gestion des Tombes
          </h1>
          

          {loading ? (
            <p className="text-center">Chargement des tombes...</p>
          ) : (
            <ul className="space-y-4">
              {tombs.length > 0 ? (
                tombs.map((tomb) => (
                  <li
                    key={tomb.id}
                    className="flex justify-between items-center bg-white p-4 rounded shadow"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">
                        {tomb.title || "Sans titre"}
                      </h2>
                      <p>Cimetière : {tomb.cemetery || "Non spécifié"}</p>
                      {tomb.imageTomb && (
                        <img
                          src={tomb.imageTomb}
                          alt={tomb.title}
                          className="w-24 h-24 mt-2 rounded object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(tomb.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Aucune tombe trouvée.
                </p>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TombsManagementPage;
