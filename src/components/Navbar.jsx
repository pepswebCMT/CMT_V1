import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import LanguageSelector from "./LanguageSelector";
import CMT2 from "../assets/img/CMT-logo-02.svg";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // État pour le menu burger
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-mandarin-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-4">
        {/* Logo */}
        <Link to={"/home"} className="flex items-center">
          <img src={CMT2} alt="Catch my Tomb" className="w-full h-10 mr-3" />
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Catch My Tomb
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center  rounded-lg md:hidden "
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Ouvrir le menu</span>

          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>

        {/* Menu Links */}
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={"/home"} className="font-bold text-xl block py-2 pl-3">
                {t("home")}{" "}
              </Link>
            </li>
            <li>
              <Link to={"/"} className="font-bold text-xl block py-2 pl-3">
                {t("download")}{" "}
              </Link>
            </li>
            {currentUser ? (
              <>
                <li>
                  <Link
                    to={"/profile"}
                    className="font-bold text-xl block py-2 pl-3"
                  >
                    {t("profile")}{" "}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"/login"}
                    className="font-bold text-xl block py-2 pl-3"
                  >
                    {t("login")}{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/register"}
                    className="font-bold text-xl block py-2 pl-3"
                  >
                    {t("register")}{" "}
                  </Link>
                </li>
              </>
            )}
            <li>
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
