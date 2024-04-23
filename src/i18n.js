import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./lang/en.json";
import translationFR from "./lang/fr.json";

export const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.changeLanguage(navigator.language.split("-")[0]);

export default i18n;
