//import { FaUserCircle } from "react-icons/fa";
//import { IoIosLogOut } from "react-icons/io";
import LangManager from "./LangManager";
import CMT2 from "../assets/img/CMT-logo-02.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
/* import Modal from "./Modal";
import UserProfile from "./ModalProfil";
import { useEffect, useState } from "react";
import { Auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth"; */

const Navbar = () => {
  //const [currentUser, setCurrentUser] = useState(null);
  //const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  //const nav = useNavigate();

  /*   const handleUserIconClick = () => {
    setIsProfileModalOpen(true);
  }; */

  /*   const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  }; */

  /*   const handleSignOut = () => {
    Auth.signOut();
    nav("/home");
  }; */

  /*   useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []); */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {/* <nav className="w-full z-50 bg-mandarin-100 dark:bg-mandarinDark fixed top-0 flex justify-between items-center gap-2 p-2 shadow-inner">
        <motion.div
          className="w-1/5 flex justify-center items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          <LangManager />
        </motion.div>
        <motion.div
          className="w-2/4 max-w-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          <Link to={"/"}>
            <img src={CMT2} alt="Catch my Tomb" className="w-full" />
          </Link>
        </motion.div> */}

      {/*         <motion.div
          className="w-1/5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
        >
          {currentUser ? (
            <IoIosLogOut
              className="w-full text-5xl text-white dark:text-dark-200"
              onClick={handleSignOut}
            />
          ) : (
            <FaUserCircle
              className="w-full text-5xl text-white dark:text-dark-200"
              onClick={handleUserIconClick}
            />
          )}
        </motion.div> */}
      {/* </nav> */}

      <nav className="bg-mandarin-100 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/home"}>
            <div className="flex">
              <img
                src={CMT2}
                alt="Catch my Tomb"
                className="w-full h-14 mr-3	"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Catch My Tomb
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/home"}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl "
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl "
                >
                  Téléchargement
                </Link>
              </li>
              <li>
                <Link
                  to={"/login"}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-bold text-2xl "
                >
                  Se connecter/ S'inscire
                </Link>
              </li>
              <li>
                <LanguageSelector />
              </li>

              {/* Ajoute tes autres liens ici */}
            </ul>
          </div>
        </div>
      </nav>

      {/*       <Modal isOpen={isProfileModalOpen} onClose={handleCloseModal}>
        <UserProfile user={currentUser} />
      </Modal> */}
    </>
  );
};

export default Navbar;
