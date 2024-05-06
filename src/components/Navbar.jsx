import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import LangManager from "./LangManager";
import CMT2 from "../assets/img/CMT-logo-02.svg";
import { Link } from "react-router-dom";

const Navbar = ({ onUserIconClick }) => {
  return (
    <nav className="w-full z-50 bg-mandarin-100 dark:bg-mandarinDark fixed top-0 flex justify-between items-center gap-2 p-2 shadow-inner">
      <div className="w-1/5 flex justify-center items-center">
        <LangManager />
      </div>
      <div className="w-2/4 max-w-20">
        <Link to={"/"}>
          <img src={CMT2} alt="Catch my Tomb" className="w-full" />
        </Link>
      </div>

      <FaUserCircle
        className="w-1/5 text-5xl text-white dark:text-dark-200"
        onClick={onUserIconClick}
      />
    </nav>
  );
};

export default Navbar;
