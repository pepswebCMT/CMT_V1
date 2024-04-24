import React from "react";
//import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p className="copyright">&copy; {t("footer_copyright")}</p>
    </footer>
  );
};

export default Footer;
