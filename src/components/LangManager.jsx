import React from "react";
import { useTranslation } from "react-i18next";
import { FR, GB } from "country-flag-icons/react/3x2";

const LangManager = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange}>
      <option value="en">
        <GB title="English" />
      </option>
      <option value="fr">
        <FR title="Français" />
      </option>
    </select>
  );
};

export default LangManager;
