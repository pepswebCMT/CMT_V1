import React from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onUserIconClick }) => {
  return (
    <nav className="navbar">
      <FaBars className="icon" /> 
      <div className="search-container">
        <input type="text" placeholder="Rechercher..." className="search-input" />
        <FaSearch className="icon search-icon" /> 
      </div>
      <FaUserCircle className="icon" onClick={onUserIconClick} />
    </nav>
  );
};

export default Navbar;
