import React, { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BsSendPlusFill } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import illustration from "../assets/img/headstonesPhotoA.webp";
import Navbar from "../components/Navbar";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PhotoPage = () => {
  const [personality, setPersonality] = useState("");
  const [cemetery, setCemetery] = useState("");
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    if (name) {
      setPersonality(name);
    }
  }, [location.search]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("pendingFormData"));
    if (storedData) {
      setPersonality(storedData.personality || "");
      setCemetery(storedData.cemetery || "");
      setSelectedFileName(storedData.selectedFileName || "");
    }
  }, []);

  const handlePersonalityChange = (e) => {
    const value = e.target.value.slice(0, 50);
    setPersonality(value);
    saveFormData();
  };

  const handleCemeteryChange = (e) => {
    const value = e.target.value.slice(0, 50);
    setCemetery(value);
    saveFormData();
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setSelectedFileName(newFile.name);
      saveFormData();
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
    setIsSubmitting(true);

    if (!file) {
      setIsSubmitting(false);
      alert(t("add_tomb_add_photo"));
      return;
    }

    if (!navigator.geolocation) {
      setIsSubmitting(false);
      alert(t("add_tomb_no_geo"));
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "PendingTombs"));
      const count = querySnapshot.size;
      const newTombName = (count + 1).toString();

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const storageRef = ref(storage, `images/${newTombName}`);
          const uploadTask = await uploadBytes(storageRef, file);
          const imageUrl = await getDownloadURL(uploadTask.ref);

          const tombData = {
            title: personality,
            cemetery: cemetery,
            imageTomb: imageUrl,
            location: `${position.coords.latitude},${position.coords.longitude}`,
            status: "en attente",
          };

          await setDoc(doc(db, "PendingTombs", newTombName), tombData);

          setSubmitStatus(t("add_tomb_submit_verify"));
          clearFormData();
          setIsSubmitting(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation: ", error);
          setIsSubmitting(false);
        }
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des données: ", error);
      setSubmitStatus(`Oops : ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const saveFormData = () => {
    const formData = {
      personality,
      cemetery,
      selectedFileName,
    };
    localStorage.setItem("pendingFormData", JSON.stringify(formData));
  };

  const clearFormData = () => {
    localStorage.removeItem("pendingFormData");
    setPersonality("");
    setCemetery("");
    setFile(null);
    setSelectedFileName("");
  };

  return (
    <section className="w-full flex justify-center items-center pt-28 font-josefin">
      <Navbar />
      <div className="w-full max-w-96 flex flex-col justify-between gap-6 items-center p-2">
        <motion.div className="w-full sticky top-28 z-40 bg-white p-2 flex flex-col justify-center items-center gap-3 font-josefinBold font-bold rounded-xl shadow-inner">
          <Link
            to="#"
            onClick={() => navigate(-1)}
            className="w-full flex justify-between items-center text-3xl text-mandarin-100 dark:bg-mandarin-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <h1>{t("add_tomb_title")}</h1>
          </Link>
        </motion.div>
        <div className="w-full max-w-96">
          <img src={illustration} alt="Partagez votre découverte" />
        </div>
        <div className="w-full flex flex-col justify-around items-center gap-3 text-2xl font-bold">
          <h1>{t("add_tomb_share")}</h1>
          <div className="w-full flex flex-col justify-center items-center">
            <button
              type="button"
              className="max-w-72 bg-mandarin-100 dark:bg-mandarin-600 rounded-3xl p-6 text-center font-aileron text-xl shadow-xl flex flex-col justify-center items-center"
              onClick={handleTakePhotoClick}
            >
              <IconContext.Provider value={{ size: "3em", color: "white" }}>
                <MdAddAPhoto />
              </IconContext.Provider>
            </button>
            <p className="w-full p-1 text-center text-lg">
              {t("add_tomb_photo")}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-around items-center gap-4 text-xl font-aileron"
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
              placeholder={t("add_tomb_name")}
              maxLength="50"
              className="w-full max-w-96 border-2 p-2 rounded-xl"
              disabled={location.search.includes("name")}
              required
            />
            <input
              type="text"
              value={cemetery}
              onChange={handleCemeteryChange}
              placeholder={t("add_tomb_cemetery")}
              maxLength="50"
              className="w-full max-w-96 border-2 p-2 rounded-xl"
              required
            />
            {selectedFileName && (
              <div className="w-full text-center">
                {t("add_tomb_file_added")}
              </div>
            )}
            <button
              type="submit"
              className="rounded-full py-3 px-5 bg-mandarin-100 dark:bg-mandarin-600 flex justify-center items-center font-aileron"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader
                  color={"#ffffff"}
                  loading={isSubmitting}
                  css={override}
                  size={24}
                />
              ) : (
                <>
                  <p className="pr-2 font-aileronBold text-white">
                    {t("add_tomb_send")}
                  </p>
                  <BsSendPlusFill size="1.5em" color="white" />
                </>
              )}
            </button>
            {submitStatus && (
              <p className="w-full p-2 text-center text-lg">{submitStatus}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PhotoPage;
