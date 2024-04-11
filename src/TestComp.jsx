import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const SubcollectionsComponent = () => {
  const [litteratureData, setLitteratureData] = useState([]);
  const [otherData, setOtherData] = useState({});
  const documentId = 'OccpEQD19eoOmrLfPaP0';

  const fetchLitterature = async () => {
    const litteratureRef = collection(db, 'Tombs', documentId, 'Litterature');
    try {
      const querySnapshot = await getDocs(litteratureRef);
      if (querySnapshot.empty) {
        console.log('La sous-collection Litterature est vide.');
      } else {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Documents récupérés de Litterature:", data);
        setLitteratureData(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de 'Litterature': ", error);
    }
  };
  

  // Fonction pour récupérer les autres sous-collections
  const fetchOtherSubcollections = async () => {
    const subcollections = ['Sport', 'Lesplusconnus', 'HommesHistoire', 'Acteurs', 'Chanteur', 'Hommes politique'];
    let newOtherData = {};

    for (let subcollection of subcollections) {
      const subColRef = collection(db, 'Tombs', documentId, subcollection);
      try {
        const subColSnapshot = await getDocs(subColRef);
        newOtherData[subcollection] = subColSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error(`Erreur lors de la récupération de '${subcollection}': `, error);
      }
    }

    setOtherData(newOtherData);
  };

  useEffect(() => {
    fetchLitterature();
    fetchOtherSubcollections();
  }, []);

  return (
    <div>
      <h2>Litterature</h2>
      {litteratureData.map((doc) => (
        <div key={doc.id}>
          <p>{JSON.stringify(doc)}</p>
        </div>
      ))}
      <h2>Autres sous-collections</h2>
      {Object.entries(otherData).map(([subcollectionName, documents]) => (
        <div key={subcollectionName}>
          <h3>{subcollectionName}</h3>
          {documents.map((doc) => (
            <div key={doc.id}>
              <p>{JSON.stringify(doc)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SubcollectionsComponent;
