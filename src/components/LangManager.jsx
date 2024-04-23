import { useState } from "react";
import Modal from "./Modal";
import ModalLang from "./ModalLang";
import { CircleFlag } from "react-circle-flags";
import i18n from "../i18n";

const LangManager = () => {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const closeModal = () => {
    setIsLangModalOpen(false);
  };

  const selectCountry = () => {
    switch (i18n.language) {
      case "en":
        return "uk";

      default:
        return i18n.language;
    }
  };

  return (
    <>
      <div
        className="p-1 w-12 bg-white rounded-full"
        onClick={() => {
          setIsLangModalOpen(true);
        }}
      >
        <CircleFlag countryCode={selectCountry()} className="w-full" />
      </div>
      <Modal isOpen={isLangModalOpen} onClose={closeModal}>
        <ModalLang closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default LangManager;
