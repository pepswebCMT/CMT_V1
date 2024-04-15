import React from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onUserIconClick }) => {
  return (
    <nav className="navbar">
      <FaBars className="icon" />  {/* Menu icon */}
      <div className="search-container">
        <input type="text" placeholder="Rechercher..." className="search-input" />
        <FaSearch className="icon search-icon" />  {/* Search icon as a part of input */}
      </div>
      <FaUserCircle className="icon" onClick={onUserIconClick} />  {/* User profile icon */}
    </nav>
  );
};

export default Navbar;
