import { useTranslation } from "react-i18next";
import { CircleFlag } from "react-circle-flags";
import { motion } from "framer-motion";

const ModalLang = ({ closeModal }) => {
  const { i18n } = useTranslation();
  const languages = ["en", "fr"];

  const handleLanguageChange = (e) => {
    const newLang = e.target.title;
    i18n.changeLanguage(newLang);
    closeModal();
  };

  const selectCountry = (lang) => {
    if (lang === "en") {
      return "uk";
    } else {
      return lang;
    }
  };

  return (
    <section className="grid grid-cols-3 gap-6 p-6 bg-white dark:bg-dark-400 rounded-xl">
      {languages &&
        languages.map((lang) => {
          return (
            <motion.div
              className="w-full p-1 bg-mandarin-100 dark:bg-mandarin-600 rounded-full"
              key={lang}
              value={lang}
              onClick={handleLanguageChange}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CircleFlag countryCode={selectCountry(lang)} className="w-16" />
            </motion.div>
          );
        })}
    </section>
  );
};

export default ModalLang;
