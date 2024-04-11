// PhotoPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './styles/PhotoPage.css';
import illustration from '../assets/img/illustrationA.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const PhotoPage = () => {
  const [personality, setPersonality] = useState('');
  const [cemetery, setCemetery] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handlePersonalityChange = e => setPersonality(e.target.value);
  const handleCemeteryChange = e => setCemetery(e.target.value);
  const [submitStatus, setSubmitStatus] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setSelectedFileName(newFile.name); 
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleTakePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus('');

    if (!file) {
      alert('Veuillez prendre une photo avant de soumettre.');
      return;
    }

    if (!navigator.geolocation) {
      alert('Géolocalisation non prise en charge par votre navigateur.');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(uploadTask.ref);

      const tombData = {
        title: personality,
        cemetery: cemetery,
        imageUrl: imageUrl,
        location: `${position.coords.latitude},${position.coords.longitude}`
      };

      try {
        await addDoc(collection(db, 'NewTombs'), tombData);
        setSubmitStatus('Bravo !! la découverte a été partagée.');
        setTimeout(() => {
        setSubmitStatus('');
        setPersonality('');
        setCemetery('');
        setFile(null);
        setSelectedFileName(''); 
    }, 4000);
      } catch (error) {
        setSubmitStatus(`Oops : ${error.message}`);
      }
    }, (error) => {
      console.error('Erreur de géolocalisation: ', error);
    });
  };

  return (
    <div className="photo-page">
      <div className="category-header">
        <Link to="#" onClick={() => navigate(-1)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>  
      <div className="photo-header">
        <img src={illustration} alt="Partagez votre découverte" />
      </div>
      <div className="photo-content">
        <h1>Partagez avec nous votre découverte</h1>
        <div className='cap-ph'>
          <button type="button" className="photo-button" onClick={handleTakePhotoClick}>
            Prendre une photo
          </button>
          <p className='take-ph'>Prenez une photo de la tombe trouvée</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*" 
            capture="environment" 
            onChange={handleFileChange} 
          />
          <input 
            type="text" 
            value={personality} 
            onChange={handlePersonalityChange} 
            placeholder="Tapez le nom de la personnalité" 
            required 
          />
          <input 
            type="text" 
            value={cemetery} 
            onChange={handleCemeteryChange} 
            placeholder="Tapez le nom du cimetière" 
            required 
          />
          {selectedFileName && (
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {selectedFileName}
          </a>
        )}
          <button type="submit" className="submit-button">
            <span className="arrow-icon">→</span>
          </button>
          {submitStatus && <div className="submit-status">{submitStatus}</div>}
        </form>
      </div>
    </div>
  );
};

export default PhotoPage;
