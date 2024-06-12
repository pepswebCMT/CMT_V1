import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import IconBar from "../components/IconBar";
import Navbar from "../components/Navbar";
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
  const [isAppUnavailable, setIsAppUnavailable] = useState(false);
  const displayedCelebrityCount = 8;
  const { t } = useTranslation();

  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

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
    const fetchCelebrities = async (category) => {

      try {
        const docRef = doc(db, "Tombs", "Categories");
        const colRef = collection(docRef, category);
        const querySnapshot = await getDocs(colRef);
        const fetchedCelebrities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
      } catch (error) {
        if (error.code === 'resource-exhausted') {
          setIsAppUnavailable(true);
        } else {
          console.error("Une erreur s'est produite lors de la récupération des données :", error);
        }
      }
    };

    fetchCelebrities(selectedCategory);
  }, [selectedCategory, displayedCelebrityCount]);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

if (isAppUnavailable) {
  return (
    <div className="flex items-center justify-center h-screen font-aileronBold">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-red-500 mb-4">L'application est temporairement indisponible</h2>
        <p className="text-xl text-gray-600">Nous sommes désolés, mais l'application est temporairement indisponible car en maintenance. Veuillez réessayer plus tard.</p>
      </div>
    </div>
  );
}


  return (
    <main className="w-full pt-20 pb-20 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar />
      <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
        <div className="w-full max-w-96 font-bold text-4xl p-2 text-center">
          <h2>{t("home_h1")}</h2>
        </div>
        <IconBar onCategoryChange={handleCategoryChange} />
        <div className="w-full p-2 flex justify-between items-center text-xl font-josefinBold font-bold text-mandarin-100">
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
              [...celebrities, ...celebrities].map((celebrity, index) => (
                <Link
                  key={index}
                  to={`/category/${selectedCategory}/${celebrity.id}`}
                >
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
