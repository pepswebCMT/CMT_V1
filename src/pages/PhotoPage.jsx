import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BsSendPlusFill } from "react-icons/bs";
// import "./styles/PhotoPage.css";
import illustration from "../assets/img/headstonesPhotoA.webp";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { IconContext } from "react-icons";

const PhotoPage = () => {
  const [personality, setPersonality] = useState("");
  const [cemetery, setCemetery] = useState("");
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handlePersonalityChange = (e) => setPersonality(e.target.value);
  const handleCemeteryChange = (e) => setCemetery(e.target.value);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setSelectedFileName(newFile.name);
    }
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const handleTakePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("");

    if (!file) {
      alert("Veuillez prendre une photo avant de soumettre.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Géolocalisation non prise en charge par votre navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(uploadTask.ref);

        const tombData = {
          title: personality,
          cemetery: cemetery,
          imageUrl: imageUrl,
          location: `${position.coords.latitude},${position.coords.longitude}`,
          status: "en attente",
        };

        try {
          await addDoc(collection(db, "PendingTombs"), tombData);
          setSubmitStatus("Votre soumission est en attente de vérification.");
          setTimeout(() => {
            setSubmitStatus("");
            setPersonality("");
            setCemetery("");
            setFile(null);
            setSelectedFileName("");
          }, 4000);
        } catch (error) {
          setSubmitStatus(`Oops : ${error.message}`);
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation: ", error);
      }
    );
  };

  return (
    <section className="w-full pt-28">
      <Navbar />
      <Modal></Modal>
      <div className="w-full overflow-hidden flex flex-col justify-between gap-6 items-center p-5">
        <div className="w-full max-w-96 p-2 flex flex-col justify-center items-center gap-3">
          <Link
            to="#"
            onClick={() => navigate(-1)}
            className="w-full flex justify-between items-center text-3xl text-mandarin"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <h1>Ajouter une tombe</h1>
          </Link>
        </div>
        <div className="w-full max-w-96">
          <img src={illustration} alt="Partagez votre découverte" />
        </div>
        <div className="w-full flex flex-col justify-around items-center gap-3 text-xl">
          <h1>Partagez avec nous votre découverte</h1>
          <div className="w-full flex flex-col justify-center items-center">
            <button
              type="button"
              className="w-2/3 max-w-72 bg-mandarin rounded-3xl p-2 text-center font-bold text-xl shadow-xl"
              onClick={handleTakePhotoClick}
            >
              Prendre une photo
            </button>
            <p className="w-full p-1 text-center text-sm">
              Prenez une photo de la tombe trouvée
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-around items-center text-xl"
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
            />
            <input
              type="text"
              value={personality}
              onChange={handlePersonalityChange}
              placeholder="Tapez le nom de la personnalité"
              className="w-full max-w-96"
              required
            />
            <input
              type="text"
              value={cemetery}
              onChange={handleCemeteryChange}
              placeholder="Tapez le nom du cimetière"
              className="w-full max-w-96"
              required
            />
            {selectedFileName && <div className="">{selectedFileName}</div>}
            <button
              type="submit"
              className="rounded-full p-5 bg-mandarin flex justify-center items-center"
            >
              <p className="pr-4 font-bold">Envoyer</p>
              <IconContext.Provider value={{ size: "2rem", color: "white" }}>
                <BsSendPlusFill className="text-center" />
              </IconContext.Provider>
            </button>
            {submitStatus && <div className="">{submitStatus}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PhotoPage;
