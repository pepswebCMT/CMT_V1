import React, { useState } from "react";
import franceFlag from "../assets/img/france.webp"; // Remplace par ton chemin réel
import ukFlag from "../assets/img/anglais.webp"; // Remplace par ton chemin réel
import polandFlag from "../assets/img/france.webp"; // Exemple pour polonais

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("France");
  const [selectedFlag, setSelectedFlag] = useState(franceFlag);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler l'ouverture du menu

  const languages = [
    { name: "English", flag: ukFlag },
    { name: "French", flag: franceFlag },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.name);
    setSelectedFlag(language.flag);
    setIsMenuOpen(false); // Fermer le menu après sélection
    console.log("Langue sélectionnée :", language.name);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Bouton principal */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Ouvre/ferme le menu
        className="inline-flex items-center justify-between w-full px-4 py-2 font-bold text-2xl text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        <img
          src={selectedFlag}
          alt={selectedLanguage}
          className="w-5 h-5 mr-2"
        />
        {selectedLanguage}
        <svg
          className={`w-5 h-5 ml-2 -mr-1 transition-transform ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.063a.75.75 0 011.08 1.04l-4 4.375a.75.75 0 01-1.08 0l-4-4.375a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div
          className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language.name}>
                <button
                  onClick={() => handleLanguageChange(language)} // Sélectionne la langue et ferme le menu
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="w-5 h-5 mr-2"
                  />
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
