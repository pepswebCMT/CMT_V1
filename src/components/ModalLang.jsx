import { useTranslation } from "react-i18next";
import { CircleFlag } from "react-circle-flags";

const ModalLang = ({ closeModal }) => {
  const { i18n } = useTranslation();
  const languages = ["en", "fr"];

  const handleLanguageChange = (e) => {
    const newLang = e.target.title;
    i18n.changeLanguage(newLang);
    closeModal();
  };

  return (
    <section className="grid grid-cols-3 gap-6">
      {languages &&
        languages.map((lang) => {
          if (lang === "en") {
            return (
              <div
                className="w-full"
                key={lang}
                value="en"
                onClick={handleLanguageChange}
              >
                <CircleFlag countryCode="uk" className="w-full" />
              </div>
            );
          }
          return (
            <div
              className="w-full"
              key={lang}
              value={lang}
              onClick={handleLanguageChange}
            >
              <CircleFlag countryCode={lang} className="w-full" />
            </div>
          );
        })}
    </section>
  );
};

export default ModalLang;
