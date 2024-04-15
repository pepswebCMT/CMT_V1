import React from 'react';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';


const Navbar = ({ onUserIconClick }) => {
  return (
    <nav className="navbar">
      <FaBars className="icon" />
      <FaSearch className="icon" />
      <FaUserCircle className="icon" onClick={onUserIconClick} />
    </nav>
  );
};

export default Navbar;
