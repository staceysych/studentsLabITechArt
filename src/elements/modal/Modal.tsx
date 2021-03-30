import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import "./Modal.scss";

import cancel from "images/cancel.svg";

import { ACTIONS } from "../../redux/actions/creators";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FC<Props> = ({ handleCloseModal, children }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    handleCloseModal();
  };

  return createPortal(
    <>
      <div className="Modal__overlay" />
      <div className="Modal">
        <button className="Modal__cancel" type="button" onClick={closeModal}>
          <img src={cancel} alt="cancel" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
