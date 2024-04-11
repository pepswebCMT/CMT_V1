import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import IconBar from '../components/IconBar';
import './styles/HomePage.css';
import Footer from '../components/Footer';
import LogoutButton from '../components/Logout';
import { MdAddAPhoto } from 'react-icons/md';
import { FaMapMarkedAlt } from 'react-icons/fa';


const HomePage = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Lesplusconnus');
  const displayedCelebrityCount = 7;

  useEffect(() => {
    const fetchCelebrities = async (category) => {
      const docRef = doc(db, "Tombs", "OccpEQD19eoOmrLfPaP0");
      const colRef = collection(docRef, category);
      const querySnapshot = await getDocs(colRef);
      const fetchedCelebrities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
    };

    fetchCelebrities(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main className="homepage">
      <LogoutButton />
      <div className="featured-section">
        <div className='home-title'>
          <h1>Où reposent en paix vos célébrités favorites ?</h1>
        </div>
        <br />
        <IconBar onCategoryChange={handleCategoryChange} />
        <div className="section-header">
          <h3>{selectedCategory}</h3>
          <Link to={`/category/${selectedCategory}`} className="see-all-link">Tout voir >> </Link>
        </div>
        <div className="celebrity-list">
          {celebrities.map(celebrity => (
            <Link key={celebrity.id} to={`/category/${selectedCategory}/${celebrity.id}`} className="celebrity-card-link">
              <div className="celebrity-card">
                <div className="celebrity-image-container">
                  <div className="celebrity-image-overlay">
                    <h3 className="celebrity-name">{celebrity.title}</h3>
                  </div>
                  <img src={celebrity.imageUrl} alt={celebrity.title} className="celebrity-image" />
                </div>
                <div className="celebrity-info">
                  <p>{celebrity.cemetery}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="icon-container">
    <button className="icon-button camera-button">
      <MdAddAPhoto className="icon" />  
    </button>
    <button className="icon-button map-button">
      <FaMapMarkedAlt className="icon" />
    </button>
  </div>
      <Footer />
    </main>
  );
};



export default HomePage;

