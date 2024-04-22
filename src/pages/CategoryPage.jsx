import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./styles/CategoryPage.css";
import { useTranslation } from "react-i18next";

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
    <div className="category-page">
      <div className="category-header">
        <h1 className='category-name'>{formattedCategory}</h1>
        <Link to="/" className="back-button"><FontAwesomeIcon icon={faArrowLeft} /></Link>
      </div>
      <h2 className="intro-ft">
        {t("category_title")}
        {formattedCategory}
      </h2>
      <div className="items-container">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/category/${category}/${item.id}`}
            className="item-card"
          >
            <img src={item.imageUrl} alt={item.title} className="item-image" />
            <div className="item-info">
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
