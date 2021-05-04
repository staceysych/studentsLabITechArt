import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import cancel from "images/cancel.svg";

import { ACTIONS } from "../../redux/actions/creators";

import styles from "./Modal.module.scss";

interface Props {
  children: React.ReactNode;
  handleCloseModal: () => void;
  customClassName?: string;
}

const Modal: React.FC<Props> = ({ handleCloseModal, children, customClassName }) => {
  const dispatch = useDispatch();
  const [className, setClassName] = useState<string[]>([styles.wrapper]);

  useEffect(() => {
    if (customClassName) {
      setClassName((prevState) => [...prevState, ...customClassName]);
    }
  }, []);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    handleCloseModal();
  };

  return createPortal(
    <>
      <div className={styles.overlay} />
      <div className={className.join("")}>
        <button className={styles.cancel} type="button" onClick={closeModal}>
          <img src={cancel} alt="cancel" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
