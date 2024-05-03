import { FaMapMarkedAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const NavButtons = () => {
  return (
    <div className="fixed bottom-20 right-2 z-50 flex flex-col justify-between gap-6">
      <IconContext.Provider value={{ size: "3rem", color: "white" }}>
        <Link to={`/photopage`}>
          <motion.button
            className="w-20 h-20 bg-mandarin-100 dark:bg-mandarinDark rounded-full flex justify-center items-center shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <MdAddAPhoto className="" />
          </motion.button>
        </Link>
        <Link to={`/map`}>
          <motion.button
            className="w-20 h-20 bg-mandarin-100 dark:bg-mandarinDark rounded-full flex justify-center items-center shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <FaMapMarkedAlt className="w-full" />
          </motion.button>
        </Link>
      </IconContext.Provider>
    </div>
  );
};

export default NavButtons;
