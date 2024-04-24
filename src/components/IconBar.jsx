import React from "react";
import "./IconeBar.css";

const IconBar = ({ onCategoryChange }) => {
  const handleIconClick = (category) => {
    onCategoryChange(category);
  };

  const variants = {
    base: { opacity: 0.5 },
    hovered: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full max-w-96 shadow-xl text-2xl p-2 flex justify-between items-center rounded-lg">
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Sport")}
      >
        📚
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Sport")}
      >
        🏀
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Lesplusconnus")}
      >
        🌟
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("HommesHistoire")}
      >
        🎩
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Acteurs")}
      >
        🎭
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Chanteur")}
      >
        🎤
      </div>
      <div
        className="grayscale hover:grayscale-0 hover:scale-125"
        onClick={() => handleIconClick("Hommes politique")}
      >
        🏛️
      </div>
    </div>
  );
};

export default IconBar;
