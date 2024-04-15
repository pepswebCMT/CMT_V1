// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Assurez-vous d'ajouter des styles pour .modal et .modal-content

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
