import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import LangManager from "./LangManager";
import { useTranslation } from "react-i18next";

const Navbar = ({ onUserIconClick }) => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <LangManager />
      <div className="search-container">
        <input
          type="text"
          placeholder={t("navbar_search")}
          className="search-input"
        />
        <FaSearch className="icon search-icon" />
      </div>
      <FaUserCircle className="icon" onClick={onUserIconClick} />
    </nav>
  );
};

export default Navbar;
