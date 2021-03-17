import React from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, children }) =>
  isOpen &&
  createPortal(
    <>
      <div className="Modal__overlay" />
      <div className="Modal">{children}</div>
    </>,
    document.getElementById("modal")
  );

export default Modal;
