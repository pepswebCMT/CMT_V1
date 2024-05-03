import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const colRef = collection(db, "Tombs", "OccpEQD19eoOmrLfPaP0", category);
      const querySnapshot = await getDocs(colRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    };

    fetchItems();
  }, [category]);
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="w-full flex justify-center pt-28 dark:bg-dark-200 dark:text-white font-josefin">
      <Navbar />
      <div className="w-full max-w-96 p-2 flex flex-col gap-2 justify-center items-center">
        <motion.div
          className="w-full p-2 rounded-xl shadow-inner sticky z-40 top-28 flex justify-between items-center font-bold text-3xl text-mandarin-100 dark:text-mandarin-600 bg-white dark:bg-dark-400"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <Link to="/home">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1>{formattedCategory}</h1>
        </motion.div>
        <h2 className="w-full text-center text-2xl font-bold">
          {t("category_title")}
        </h2>
        <div className="w-full grid grid-cols-2 gap-4 justify-items-center place-items-center">
          {items.map((item) => (
            <motion.div
              className="w-44 h-60 rounded-2xl bg-slate-50 shadow-2xl relative"
              initial={{ opacity: 0, translateY: 50 }}
              whileHover={{ scale: 1.1 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link key={item.id} to={`/category/${category}/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
                <div className="w-full absolute bottom-0 z-20 flex justify-center items-center gap-4 p-1 text-white text-center text-lg font-bold rounded-b-2xl rounded-bl-2xl bg-opacity-50 bg-black">
                  <FaStar />
                  <h3 className="">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
