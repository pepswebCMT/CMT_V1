// import React, { useState, useEffect } from "react";
// import { db } from "../firebase-config";
// import { collection, getDocs, doc } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import IconBar from "../components/IconBar";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useTranslation } from "react-i18next";
// import AdBox from "../components/AdBox";
// import CelebCard from "../components/CelebCard";
// import useMeasure from "react-use-measure";
// import { motion, animate, useMotionValue } from "framer-motion";
// import NavButtons from "../components/NavButtons";

// const HomePage = () => {
//   const [celebrities, setCelebrities] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("Les plus connus");
//   const [isAppUnavailable, setIsAppUnavailable] = useState(false);
//   const displayedCelebrityCount = 8;
//   const { t } = useTranslation();

//   const categories = [
//     "Histoire et Politique",
//     "Scientifiques",
//     "Litterature et Philosophie",
//     "Sports",
//     "Arts visuels",
//     "Arts musicaux",
//     "Arts vivants",
//     "Les plus connus",
//   ];

//   if (localStorage.getItem("exp")) {
//     const exp = Number(localStorage.getItem("exp"));
//     const now = Date.now();
//     const day = 60 * 60 * 24 * 1000;
//     if (exp + day <= now) {
//       localStorage.removeItem("exp");
//       categories.forEach((category) => {
//         localStorage.removeItem(category);
//       });
//     }
//   } else {
//     localStorage.setItem("exp", Date.now());
//   }

//   let [ref, { width }] = useMeasure();

//   const xTranslation = useMotionValue(0);

//   useEffect(() => {
//     let controls;
//     let startPos = -750;
//     let finalPosition = -width / 2 + -750;

//     controls = animate(xTranslation, [startPos, finalPosition], {
//       ease: "linear",
//       duration: 30,
//       repeat: Infinity,
//       repeatType: "loop",
//       repeatDelay: 0,
//     });

//     return controls.stop;
//   }, [xTranslation, width]);

//   useEffect(() => {
//     const fetchCelebrities = async (category) => {
//       if (localStorage.getItem(category)) {
//         const fetchedCelebrities = JSON.parse(localStorage.getItem(category));
//         setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
//       } else {
//         try {
//           const docRef = doc(db, "Tombs", "Categories");
//           const colRef = collection(docRef, category);
//           const querySnapshot = await getDocs(colRef);
//           const fetchedCelebrities = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));

//           localStorage.setItem(category, JSON.stringify(fetchedCelebrities));
//           setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
//         } catch (error) {
//           if (error.code === "resource-exhausted") {
//             setIsAppUnavailable(true);
//           } else {
//             console.error(
//               "Une erreur s'est produite lors de la récupération des données :",
//               error
//             );
//           }
//         }
//       }
//     };

//     fetchCelebrities(selectedCategory);
//   }, [selectedCategory, displayedCelebrityCount]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   console.log(selectedCategory);

//   if (isAppUnavailable) {
//     return (
//       <div className="flex items-center justify-center h-screen font-aileronBold">
//         <div className="text-center">
//           <h2 className="text-4xl font-semibold text-red-500 mb-4">
//             L'application est temporairement indisponible
//           </h2>
//           <p className="text-xl text-gray-600">
//             Nous sommes désolés, mais l'application est temporairement
//             indisponible car en maintenance. Veuillez réessayer plus tard.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="w-full pb-20 dark:bg-dark-200 dark:text-white font-josefin">
//       <Navbar />
//       <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
//         <div className="w-full max-w-96 font-bold text-4xl p-2 text-center">
//           <h2>{t("home_h1")}</h2>
//         </div>
//         <IconBar onCategoryChange={handleCategoryChange} />
//         <div className="w-full p-2 flex justify-between items-center text-xl font-josefinBold font-bold text-mandarin-100">
//           <h3>{t(selectedCategory)}</h3>
//           <Link to={`/category/${selectedCategory}`} className="text-blue-400">
//             {t("home_see_all")}{" "}
//           </Link>
//         </div>
//         <div className="relative w-72 h-96">
//           <motion.div
//             className="flex gap-2 absolute left-0 "
//             ref={ref}
//             style={{ x: xTranslation }}
//           >
//             {celebrities &&
//               [...celebrities, ...celebrities].map((celebrity, index) => (
//                 <Link
//                   key={index}
//                   to={`/category/${selectedCategory}/${celebrity.id}`}
//                 >
//                   <CelebCard key={celebrity.id} celebDetails={celebrity} />
//                 </Link>
//               ))}
//           </motion.div>
//         </div>
//         <div>
//           <Link to={`/category/Tombes Manquantes`}>
//             <button className="rounded-full py-1 px-5 bg-mandarin-100 dark:bg-mandarin-600 flex justify-center items-center font-aileron text-white max-w-[200px]">
//               {t("help")}
//             </button>
//           </Link>
//         </div>
//       </section>
//       <NavButtons />
//       <Footer />
//     </main>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import IconBar from "../components/IconBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import CelebCard from "../components/CelebCard";
import useMeasure from "react-use-measure";
import { motion, animate, useMotionValue } from "framer-motion";
import NavButtons from "../components/NavButtons";

const HomePage = () => {
  const [celebrities, setCelebrities] = useState([]);
  const { t } = useTranslation();
  const [isAppUnavailable, setIsAppUnavailable] = useState(false);
  const displayedCelebrityCount = 8;

  // Les catégories en français (pour Firebase)
  const categories = [
    "Histoire et Politique",
    "Scientifiques",
    "Littérature et Philosophie",
    "Sports",
    "Arts visuels",
    "Arts musicaux",
    "Arts vivants",
    "Les plus connus",
  ];

  // Map pour la traduction des catégories
  const categoryTranslations = {
    "Histoire et Politique": "history_politics",
    Scientifiques: "scientists",
    "Littérature et Philosophie": "literature_philosophy",
    Sports: "sports",
    "Arts visuels": "visual_arts",
    "Arts musicaux": "musical_arts",
    "Arts vivants": "performing_arts",
    "Les plus connus": "most_famous",
  };

  const [selectedCategory, setSelectedCategory] = useState("Les plus connus");

  // Gérer l'expiration du cache
  useEffect(() => {
    const exp = localStorage.getItem("exp");
    const now = Date.now();
    const day = 60 * 60 * 24 * 1000;

    if (exp && Number(exp) + day <= now) {
      localStorage.clear();
      localStorage.setItem("exp", now.toString());
    } else if (!exp) {
      localStorage.setItem("exp", now.toString());
    }
  }, []);

  // Animation setup
  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    const controls = animate(xTranslation, [-750, -width / 2 + -750], {
      ease: "linear",
      duration: 30,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  // Récupérer les célébrités
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        // Vérifier le cache
        const cachedData = localStorage.getItem(selectedCategory);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setCelebrities(parsedData.slice(0, displayedCelebrityCount));
          return;
        }

        // Sinon, faire l'appel Firebase
        const docRef = doc(db, "Tombs", "Categories");
        const colRef = collection(docRef, selectedCategory);
        const querySnapshot = await getDocs(colRef);

        const fetchedCelebrities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        localStorage.setItem(
          selectedCategory,
          JSON.stringify(fetchedCelebrities)
        );
        setCelebrities(fetchedCelebrities.slice(0, displayedCelebrityCount));
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        if (error.code === "resource-exhausted") {
          setIsAppUnavailable(true);
        }
      }
    };

    fetchCelebrities();
  }, [selectedCategory, displayedCelebrityCount]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (isAppUnavailable) {
    return (
      <div className="flex items-center justify-center h-screen font-aileronBold">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-red-500 mb-4">
            {t("app_unavailable")}
          </h2>
          <p className="text-xl text-gray-600">
            {t("app_unavailable_message")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full pb-20 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar />
      <section className="w-full overflow-hidden flex flex-col justify-between gap-4 items-center p-5">
        <div className="w-full max-w-96 font-bold text-4xl p-2 text-center">
          <h2>{t("home_h1")}</h2>
          <h2>ANCIENNE VERSION CMT</h2>
        </div>
        <IconBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <div className="w-full p-2 flex justify-between items-center text-xl font-josefinBold font-bold text-mandarin-100">
          <h3>{t(categoryTranslations[selectedCategory])}</h3>
          <Link to={`/category/${selectedCategory}`} className="text-blue-400">
            {t("home_see_all")}{" "}
          </Link>
        </div>
        <div className="relative w-72 h-96">
          <motion.div
            className="flex gap-2 absolute left-0"
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
        <div>
          <Link to={`/category/Tombes Manquantes`}>
            <button className="rounded-full py-1 px-5 bg-mandarin-100 dark:bg-mandarin-600 flex justify-center items-center font-aileron text-white max-w-[200px]">
              {t("help")}
            </button>
          </Link>
        </div>
      </section>
      <NavButtons />
      <Footer />
    </main>
  );
};

export default HomePage;
