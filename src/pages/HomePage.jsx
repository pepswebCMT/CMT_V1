import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import IconBar from "../components/IconBar";
import "./styles/HomePage.css";
import { Auth } from "../firebase-config";
import { MdAddAPhoto } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/ModalProfil";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import AdBox from "../components/AdBox";

const HomePage = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Lesplusconnus");
  const displayedCelebrityCount = 7;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { t } = useTranslation();

  const handleUserIconClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchCelebrities = async (category) => {
      const docRef = doc(db, "Tombs", "OccpEQD19eoOmrLfPaP0");
      const colRef = collection(docRef, category);
      const querySnapshot = await getDocs(colRef);
      const fetchedCelebrities = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
    };

    fetchCelebrities(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const navigateToPhotoPage = () => {
    navigate("/photopage");
  };

  const navigateToMapPage = () => {
    navigate("/map");
  };

  return (
    <main className="w-full pb-32">
      <Navbar onUserIconClick={handleUserIconClick} />
      <Modal isOpen={isProfileModalOpen} onClose={handleCloseModal}>
        <UserProfile user={currentUser} />
      </Modal>

      <div className="featured-section p-5">
        <div className="w-full font-bold text-2xl p-6 text-center">
          <h2>{t("home_h1")}</h2>
        </div>
        <br />
        <IconBar onCategoryChange={handleCategoryChange} />
        <div className="section-header">
          <h3>{selectedCategory}</h3>
          <Link to={`/category/${selectedCategory}`} className="see-all-link">
            {t("home_see_all")}{" "}
          </Link>
        </div>
        <div className="celebrity-list">
          {celebrities.map((celebrity) => (
            <Link
              key={celebrity.id}
              to={`/category/${selectedCategory}/${celebrity.id}`}
              className="celebrity-card-link"
            >
              <div className="celebrity-card">
                <div className="celebrity-image-container">
                  <div className="celebrity-image-overlay">
                    <h3 className="celebrity-name">{celebrity.title}</h3>
                  </div>
                  <img
                    src={celebrity.imageUrl}
                    alt={celebrity.title}
                    className="celebrity-image"
                  />
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
        <button
          className="icon-button camera-button"
          onClick={navigateToPhotoPage}
        >
          <MdAddAPhoto className="icon" />
        </button>
        <button className="icon-button map-button" onClick={navigateToMapPage}>
          <FaMapMarkedAlt className="icon" />
        </button>
      </div>
      <section className="w-full p-4">
        <AdBox />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
