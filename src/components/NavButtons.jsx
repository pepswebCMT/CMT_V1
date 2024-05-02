import { FaMapMarkedAlt } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

const NavButtons = () => {
  return (
    <div className="fixed bottom-20 right-2 z-50 flex flex-col justify-between gap-6">
      <IconContext.Provider value={{ size: "3rem", color: "white" }}>
        <Link to={`/photopage`}>
          <button className="w-20 h-20 bg-mandarin-100 dark:bg-mandarinDark rounded-full flex justify-center items-center shadow-xl">
            <MdAddAPhoto className="" />
          </button>
        </Link>
        <Link to={`/map`}>
          <button className="w-20 h-20 bg-mandarin-100 dark:bg-mandarinDark rounded-full flex justify-center items-center shadow-xl">
            <FaMapMarkedAlt className="w-full" />
          </button>
        </Link>
      </IconContext.Provider>
    </div>
  );
};

export default NavButtons;
