import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import LangManager from "./LangManager";
import { useTranslation } from "react-i18next";

const Navbar = ({ onUserIconClick }) => {
  const { t } = useTranslation();

  return (
    <nav className="w-full z-100 bg-orange-400 fixed top-0 flex justify-between items-center gap-2 p-3">
      <div className="w-1/5 flex justify-center items-center">
        <LangManager />
      </div>
      <h1 className="text-2xl font-bold">Catch My Tomb</h1>
      <FaUserCircle
        className="w-1/5 text-5xl text-white"
        onClick={onUserIconClick}
      />
    </nav>
  );
};

export default Navbar;
