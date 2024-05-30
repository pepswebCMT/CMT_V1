import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const CelebrityDetailPage = () => {
  const [celebrity, setCelebrity] = useState(null);
  const { categoryName, celebrityId } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCelebrity = async () => {
      const docRef = doc(
        db,
        "Tombs",
        "Categories",
        categoryName,
        celebrityId
      );
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

  return (
    <section className="w-full flex justify-center pt-28 font-josefin">
      <Navbar />
      <div className="w-full max-w-96 p-2 flex flex-col gap-2 justify-center items-center">
        <motion.div
          className="w-full p-2 rounded-xl shadow-inner sticky z-40 top-28 flex justify-between items-center font-bold font-josefinBold text-2xl text-mandarin-100 dark:text-mandarin-600 bg-white dark:bg-dark-400"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <h1>{celebrity.title}</h1>
        </motion.div>
        <img
          src={celebrity.imageUrl}
          alt={celebrity.title}
          className="w-full p-2 max-w-80 rounded-3xl"
        />
        <p className="w-full  text-lg text-center font-aileron">
          {celebrity.birth_date}  -  {celebrity.death_date}.
        </p>
        <h3 className="w-full p-2 text-2xl font-bold text-center">
          {celebrity.cemetery ? celebrity.cemetery : ""}
        </h3>
        {celebrity.country ? (
          <>
            <span className="location-icon">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ fontSize: "40px", color: "red" }}
              />{" "}
            </span>
            <p className="w-full p-2 text-lg text-center font-aileron font-bold">
              {celebrity.city}, {celebrity.country}.
            </p>
          </>
        ) : null}
        {celebrity.location ? (
          <button
            onClick={() => {
              navigate(
                `/map/${`${celebrity.location._lat},${celebrity.location._long}`}`
              );
            }}
            className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl font-aileronBold"
          >
            Visiter le lieu.
          </button>
        ) : null}

        <div className="w-full max-w-96 text-xl text-justify p-2 flex flex-col items-center justify-between font-aileron font-bold">
          {showFullDescription || celebrity.description.length <= maxChar ? (
            celebrity.description
          ) : (
            <>
              <p>{`${celebrity.description.substring(0, maxChar)} ... `}</p>
              <button
                className="w-full p-2 text-blue-400 font-bold"
                onClick={toggleDescription}
              >
                Voir plus.
              </button>
            </>
          )}
          {showFullDescription && (
            <>
              <button
                className="w-full p-2 text-blue-400 font-aileron font-bold"
                onClick={toggleDescription}
              >
                Voir moins.
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => window.open(celebrity.infoUrl, "_blank")}
          className="w-1/2 max-w-80 p-2 text-xl font-bold text-gray-600 border border-gray-300 rounded-xl mt-4 hover:bg-gray-100 font-aileron"
        >
          Wikipedia
        </button>
        <div>
          <div className="w-full p-2">
            {celebrity.imageTomb && (
              <img
                src={celebrity.imageTomb}
                alt={`Tombe de ${celebrity.title}`}
                className="w-full max-w-4xl rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrityDetailPage;
