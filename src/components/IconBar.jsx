import React from "react";
import { motion } from "framer-motion";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUserSecret } from "@fortawesome/free-solid-svg-icons";



const IconBar = ({ onCategoryChange }) => {
  const categories = [
    { name: "Histoire et Politique", icon: "🏛️" },
    { name: "Les plus connus", icon: "🌟" },
    { name: "Scientifiques", icon: "💡" },
    { name: "Litterature et Philosophie", icon: "📚" },
    { name: "Sports", icon: "🏀" },
    { name: "Arts visuels", icon: "🎨" },
    { name: "Arts musicaux", icon: "🎶" },
    { name: "Arts vivants", icon: "🎭" },
    //{ name: "Criminels", icon: <FontAwesomeIcon icon={faUserSecret} /> }
  ];
  const handleIconClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="w-full max-w-96 shadow-xl text-3xl p-2 flex justify-between items-center rounded-lg dark:bg-dark-400">
      {categories.map((category) => {
        return (
          <motion.div
            className="grayscale hover:grayscale-0 hover:scale-125"
            key={category.name}
            onClick={() => handleIconClick(category.name)}
            whileHover={{ scale: 1.25 }}
            transition={{ duration: 0.15 }}
          >
            {category.icon}
          </motion.div>
        );
      })}
    </div>
  );
};

export default IconBar;
