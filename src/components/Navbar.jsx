import React from "react";
import { FaUserCircle } from "react-icons/fa";
import LangManager from "./LangManager";
import { useTranslation } from "react-i18next";
import CMT from "../assets/img/svg/CMT-logo-text.svg";

const Navbar = ({ onUserIconClick }) => {
  //const { t } = useTranslation();

  return (
    <nav className="w-full z-50 bg-orange-400 fixed top-0 flex justify-between items-center gap-2 p-3">
      <div className="w-1/5 flex justify-center items-center">
        <LangManager />
      </div>
      {/* <h1 className="text-2xl font-bold">Catch My Tomb</h1> */}
      <div className="w-2/4 p-2">
        <img src={CMT} alt="Catch my Tomb" className="w-full" />
      </div>
      <FaUserCircle
        className="w-1/5 text-5xl text-white"
        onClick={onUserIconClick}
      />
    </nav>
  );
};

export default Navbar;
