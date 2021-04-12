import React from "react";
import { useSelector } from "react-redux";

import cart from "images/add-to-cart.svg";

import { RootState } from "../../../utils/interfaces";

import "./CartIcon.scss";

const CartIcon = () => {
  const cartArray = useSelector((state: RootState) => state.page.cart);

  return (
    <div className="CartIcon">
      <img src={cart} alt="cart icon" />
      {cartArray.length ? <span>{cartArray.length}</span> : null}
    </div>
  );
};

export default CartIcon;
