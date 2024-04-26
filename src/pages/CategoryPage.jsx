import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const { t } = useTranslation();

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
    <section className="w-full flex justify-center pt-28">
      <Navbar />
      <Modal />
      <div className="w-full max-w-96 p-2 flex flex-col gap-2 justify-center items-center">
        <div className="w-full flex justify-between items-center text-3xl text-mandarin">
          <Link to="/home">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1>{formattedCategory}</h1>
        </div>
        <h2 className="w-full text-center text-xl font-bold">
          {t("category_title")}
        </h2>
        <div className="w-full grid grid-cols-2 gap-4 justify-items-center place-items-center">
          {items.map((item) => (
            <div className="w-44 h-60 rounded-2xl bg-slate-50 shadow-2xl relative">
              <Link key={item.id} to={`/category/${category}/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
                <h3 className="w-full absolute bottom-0 z-20 text-white text-center text-lg font-bold rounded-b-2xl rounded-bl-2xl bg-opacity-50 bg-black">
                  {item.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
