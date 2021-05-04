import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../../elements";
import { RootState } from "../../../utils/interfaces";

import { ACTIONS, PAGE_ACTIONS } from "../../../redux/actions/creators";

import styles from "./SubmitModal.module.scss";

const SubmitModal = () => {
  const history = useHistory();
  const isModalOpen = useSelector((state: RootState) => state.auth.isModalOpen);
  const cart = useSelector((state: RootState) => state.page.cart);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(ACTIONS.setModalOpen(false));
    history.push("/cart");
  };

  const onSubmit = () => {
    dispatch(ACTIONS.setModalOpen(false));
    dispatch(ACTIONS.setAuthInfo("Success"));
    dispatch(PAGE_ACTIONS.clearCart());
  };
  return (
    isModalOpen && (
      <Modal handleCloseModal={closeModal}>
        <div>
          <h2>Do you want to buy these items?</h2>
          <div className={styles.items}>
            {cart.map((product, index) => (
              <p key={`${product.name}-${index}`}>{`${index + 1}. ${product.name} - price: $${product.price}`}</p>
            ))}
          </div>
          <button type="submit" className="btn" onClick={onSubmit}>
            Buy
          </button>
        </div>
      </Modal>
    )
  );
};

export default SubmitModal;
