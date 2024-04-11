import React, { useState } from 'react';
import { db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PhotoPage = () => {
  const [personality, setPersonality] = useState('');
  const [cemetery, setCemetery] = useState('');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');

  const handlePersonalityChange = e => setPersonality(e.target.value);
  const handleCemeteryChange = e => setCemetery(e.target.value);
  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Vous pouvez inclure une validation ou une confirmation ici avant de continuer.

    // Téléchargement de l'image et mise à jour de Firestore
    if (file && personality && cemetery) {
      // Définissez le chemin de Storage où l'image sera sauvegardée
      const imageRef = ref(storage, `NewTombImage/${file.name}`);
      // Téléchargez l'image dans Firebase Storage
      const snapshot = await uploadBytes(imageRef, file);
      // Obtenez l'URL de téléchargement
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Récupérez la localisation
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`);
        
        // Créez un objet avec toutes les informations à enregistrer
        const tombInfo = {
          cemetery,
          imageUrl,
          location,
          title: personality
        };

        // Ajoutez les informations dans la collection Firestore
        await addDoc(collection(db, 'NewTombs'), tombInfo);

        // Réinitialisez les champs ou naviguez vers une autre page si nécessaire
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error('Please fill in all fields and take a picture.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={personality} onChange={handlePersonalityChange} placeholder="Nom de la personnalité" required />
      <input type="text" value={cemetery} onChange={handleCemeteryChange} placeholder="Nom du cimetière" required />
      <input type="file" onChange={handleFileChange} accept="image/*" capture="environment" required />
      <button type="submit">Ajouter la Tombe</button>
    </form>
  );
};

export default PhotoPage;
