import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import './styles/CelDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const CelebrityDetailPage = () => {
  const [celebrity, setCelebrity] = useState(null);
  const { categoryName, celebrityId } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrity = async () => {
      const docRef = doc(db, "Tombs", "OccpEQD19eoOmrLfPaP0", categoryName, celebrityId);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCelebrity(docSnap.data());
        } else {
          console.log("Aucun document correspondant !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du document :", error);
      }
    };

    fetchCelebrity();
  }, [categoryName, celebrityId]);

  if (!celebrity) {
    return <div>Chargement...</div>;
  }
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const maxChar = 200;

  const navigateToMap = () => {
    if (celebrity && celebrity.location) {
      const latitude = celebrity.location._lat;
      const longitude = celebrity.location._long;
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const coordinates = `${latitude},${longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
        window.open(url, '_blank');
      } else {
        console.error('Les coordonnées de localisation de la célébrité ne sont pas valides');
      }
    } else {
      console.log('Les coordonnées de la célébrité ne sont pas disponibles');
    }
  };

  return (
    <div className="celebrity-detail-page">
      <div className="category-header">
        <h1 className='celebrity-name-dt'>{celebrity.title}</h1>
        <Link to="#" onClick={() => navigate(-1)} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>  
      <div className="celebrity-header">
        <img src={celebrity.imageUrl} alt={celebrity.title} className="celebrity-image" />
        <h1 className="celebrity-title">{celebrity.title}</h1>
        <span className="celebrity-country">({celebrity.country}, {celebrity.city})</span>
      </div>
      <br />
      <div className="celebrity-content">
        <div className="celebrity-location">
          <span className='location-icon'><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '40px', color: 'red' }} /> </span>  
        </div>
        <button onClick={navigateToMap} className="celebrity-visit-link">
            Visitez le lieu
        </button>
        <p className="celebrity-description">
          {showFullDescription || celebrity.description.length <= maxChar ? (
            celebrity.description
          ) : (
            <>
              {`${celebrity.description.substring(0, maxChar)}... `}
              <span className="more-text" onClick={toggleDescription}>
                voir plus
              </span>
            </>
          )}
          {showFullDescription && (
            <span className="more-text" onClick={toggleDescription}>
              ...voir moins
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CelebrityDetailPage;
