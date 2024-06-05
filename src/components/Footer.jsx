import React from "react";
//import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  //const { t } = useTranslation();
  return (
    <footer className="w-full fixed p-4 bg-white dark:bg-dark-400 shadow-inner bottom-0 flex flex-col justify-center items-center">
      <div className="flex space-x-4 mt-2">
        <a href="https://www.facebook.com/Catchmytomb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook className="text-blue-600 hover:text-blue-800" size={24} />
        </a>
        <a href="https://www.instagram.com/catchmytombfrance/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className="text-pink-500 hover:text-pink-700" size={24} />
        </a>
        <a href="https://x.com/catchmytomb" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter className="text-blue-400 hover:text-blue-600" size={24} />
        </a>
        <a href="https://www.pinterest.fr/CatchMyTombFrance/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
          <FaPinterest className="text-red-600 hover:text-red-800" size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
