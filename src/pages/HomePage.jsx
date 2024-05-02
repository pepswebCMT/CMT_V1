import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import IconBar from "../components/IconBar";
import { Auth } from "../firebase-config";
import UserProfile from "../components/ModalProfil";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import AdBox from "../components/AdBox";
import CelebCard from "../components/CelebCard";
import useMeasure from "react-use-measure";
import { motion, animate, useMotionValue } from "framer-motion";
import NavButtons from "../components/NavButtons";

const HomePage = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Les plus connus");
  const displayedCelebrityCount = 8;
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { t } = useTranslation();

  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const handleUserIconClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    let controls;
    let startPos = -750;
    let finalPosition = -width / 2 + -750;

    controls = animate(xTranslation, [startPos, finalPosition], {
      ease: "linear",
      duration: 30,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

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

  return (
    <main className="w-full pt-20 pb-20 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar onUserIconClick={handleUserIconClick} />
      <Modal isOpen={isProfileModalOpen} onClose={handleCloseModal}>
        <UserProfile user={currentUser} />
      </Modal>
      <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
        <div className="w-full max-w-96 font-bold text-4xl p-2 text-center">
          <h2>{t("home_h1")}</h2>
        </div>
        <IconBar onCategoryChange={handleCategoryChange} />
        <div className="w-full p-2 flex justify-between items-center text-xl font-josefinBold font-bold">
          <h3>{selectedCategory}</h3>
          <Link to={`/category/${selectedCategory}`} className="text-blue-400">
            {t("home_see_all")}{" "}
          </Link>
        </div>
        <div className="relative w-72 h-96">
          <motion.div
            className="flex gap-2 absolute left-0 "
            ref={ref}
            style={{ x: xTranslation }}
          >
            {celebrities &&
              [...celebrities, ...celebrities].map((celebrity) => (
                // <Link
                //   key={celebrity.id}
                //   to={`/category/${selectedCategory}/${celebrity.id}`}
                //   className="celebrity-card-link"
                // >
                //   <div className="celebrity-card">
                //     <div className="celebrity-image-container">
                //       <div className="celebrity-image-overlay">
                //         <h3 className="celebrity-name">{celebrity.title}</h3>
                //       </div>
                //       <img
                //         src={celebrity.imageUrl}
                //         alt={celebrity.title}
                //         className="celebrity-image"
                //       />
                //     </div>
                //     <div className="celebrity-info">
                //       <p>{celebrity.cemetery}</p>
                //     </div>
                //   </div>
                // </Link>

                <Link to={`/category/${selectedCategory}/${celebrity.id}`}>
                  <CelebCard key={celebrity.id} celebDetails={celebrity} />
                </Link>
              ))}
          </motion.div>
        </div>
        <div className="w-full">
          <AdBox />
        </div>
      </section>
      <NavButtons />
      <Footer />
    </main>
  );
};

export default HomePage;
