import { FaUserCircle } from "react-icons/fa";
import LangManager from "./LangManager";
import CMT2 from "../assets/img/CMT-logo-02.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ onUserIconClick }) => {
  return (
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
        <FaUserCircle
          className="w-full text-5xl text-white dark:text-dark-200"
          onClick={onUserIconClick}
        />
      </motion.div>
    </nav>
  );
};

export default Navbar;
