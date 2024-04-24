// Modal.js
import React from "react";
import ReactDOM from "react-dom";
// import "./Modal.css"; // Assurez-vous d'ajouter des styles pour .modal et .modal-content
import { AnimatePresence, motion } from "framer-motion";
import { isVisible } from "@testing-library/user-event/dist/utils";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="w-full h-full top-0 left-0 z-50 fixed flex justify-center items-center p-6 bg-black/40"
      onClick={onClose}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="w-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,

    document.getElementById("modal-root")
  );
};

export default Modal;
