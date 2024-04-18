import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import LangManager from "./LangManager";

const Navbar = ({ onUserIconClick }) => {
  return (
    <nav className="navbar">
      <LangManager />
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher..."
          className="search-input"
        />
        <FaSearch className="icon search-icon" />
      </div>
      <FaUserCircle className="icon" onClick={onUserIconClick} />
    </nav>
  );
};

export default Navbar;
