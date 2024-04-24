import React from "react";
import "./IconeBar.css";

const IconBar = ({ onCategoryChange }) => {
  const handleIconClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="w-full shadow-xl text-2xl p-2 flex justify-between items-center rounded-lg">
      <div onClick={() => handleIconClick("Litteraire")}>📚</div>
      <div onClick={() => handleIconClick("Sport")}>🏀</div>
      <div onClick={() => handleIconClick("Lesplusconnus")}>🌟</div>
      <div onClick={() => handleIconClick("HommesHistoire")}>🎩</div>
      <div onClick={() => handleIconClick("Acteurs")}>🎭</div>
      <div onClick={() => handleIconClick("Chanteur")}>🎤</div>
      <div onClick={() => handleIconClick("Hommes politique")}>🏛️</div>
    </div>
  );
};

export default IconBar;
