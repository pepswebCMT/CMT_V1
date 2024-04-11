// Footer.jsx

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importer des icônes sociales
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
        </div>
        <div className="footer-right">
          <div className="social-icons">
            <a href="https://www.facebook.com/pepsweb" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com/pepsweb" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/pepsweb" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Catch My Tomb. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
