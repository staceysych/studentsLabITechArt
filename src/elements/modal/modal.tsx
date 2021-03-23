import React from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

import cancel from "images/cancel.svg";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FC<Props> = ({ handleCloseModal, children }) =>
  createPortal(
    <>
      <div className="Modal__overlay" />
      <div className="Modal">
        <button className="Modal__cancel" type="button" onClick={handleCloseModal}>
          <img src={cancel} alt="cancel" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );

export default Modal;
