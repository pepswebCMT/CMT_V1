import React, { useState, useEffect } from 'react';
import { db } from './firebase-config'; // Remplacez avec le chemin vers votre fichier de config Firebase
import { collection, getDocs } from 'firebase/firestore';

const TestFirebase = () => {
  const [tombs, setTombs] = useState([]);

  useEffect(() => {
    const fetchTombs = async () => {
      try {
        // Utilisez collection et getDocs pour récupérer les données
        const querySnapshot = await getDocs(collection(db, 'AllTombs'));
        const tombsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTombs(tombsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des tombes :", error);
      }
    };

    fetchTombs();
  }, []);

  return (
    <div>
      <h2>Test d'accès à Firestore</h2>
      <ul>
      {tombs.map(tomb => (
  <li key={tomb.id}>
    <strong>{tomb.title}</strong> - {tomb.cemetery} - Location: {JSON.stringify(tomb.location)}
  </li>
))}
      </ul>
    </div>
  );
};

export default TestFirebase;
