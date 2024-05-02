import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

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
        "OccpEQD19eoOmrLfPaP0",
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

  const navigateToMap = () => {
    if (celebrity && celebrity.location) {
      const latitude = celebrity.location._lat;
      const longitude = celebrity.location._long;
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const coordinates = `${latitude},${longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
        window.open(url, "_blank");
      } else {
        console.error(
          "Les coordonnées de localisation de la célébrité ne sont pas valides"
        );
      }
    } else {
      console.log("Les coordonnées de la célébrité ne sont pas disponibles");
    }
  };

  return (
    <section className="w-full flex justify-center pt-28">
      <Navbar />
      <Modal></Modal>
      <div className="w-full max-w-96 p-2 flex flex-col justify-between items-center">
        <div className="w-full p-2 flex justify-between items-center text-3xl text-mandarin">
          <Link to="#" onClick={() => navigate(-1)} className="">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2 className="text-3xl">{categoryName}</h2>
        </div>
        <h1 className="w-full p-2 text-center text-2xl font-bold">
          {celebrity.title}
        </h1>
        <img
          src={celebrity.imageUrl}
          alt={celebrity.title}
          className="w-full p-2 max-w-80 rounded-3xl"
        />
        <h3 className="w-full p-2 text-xl font-bold text-center">
          {celebrity.cemetery}
        </h3>
        <span className="location-icon">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={{ fontSize: "40px", color: "red" }}
          />{" "}
        </span>
        <p className="w-full p-2 text-lg text-center">
          à {celebrity.city} en {celebrity.country}.
        </p>
        <button
          onClick={navigateToMap}
          className="w-1/2 max-w-80 p-2 text-xl font-bold bg-blue-500 text-white rounded-xl"
        >
          Visiter le lieu.
        </button>

        <div className="w-full max-w-96 text-xl text-justify p-2 flex flex-col items-center justify-between">
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
                className="w-full p-2 text-blue-400 font-bold"
                onClick={toggleDescription}
              >
                Voir moins.
              </button>
            </>
          )}
        </div>
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
