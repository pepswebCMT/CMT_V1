import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import LangManager from "./LangManager";
import CMT2 from "../assets/img/CMT-logo-02.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "./Modal";
import UserProfile from "./ModalProfil";
import { useEffect, useState } from "react";
import { Auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const nav = useNavigate();

  const handleUserIconClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSignOut = () => {
    Auth.signOut();
    nav("/home");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <nav className="w-full z-50 bg-mandarin-100 dark:bg-mandarinDark fixed top-0 flex justify-between items-center gap-2 p-2 shadow-inner">
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
        </motion.div>
        <motion.div
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
        </motion.div>
      </nav>
      <Modal isOpen={isProfileModalOpen} onClose={handleCloseModal}>
        <UserProfile user={currentUser} />
      </Modal>
    </>
  );
};

export default Navbar;
