import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full fixed p-4 bg-white shadow-inner bottom-0 flex flex-col justify-center items-center">
      <p className="w-full text-center font-bold">
        &copy; {t("footer_copyright")}
      </p>
    </footer>
  );
};

export default Footer;
