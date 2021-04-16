import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import cart from "images/add-to-cart.svg";

import { RootState } from "../../../utils/interfaces";
import { CONSTANTS } from "../../../constants";

import "./CartIcon.scss";

const CartIcon = () => {
  const cartArray = useSelector((state: RootState) => state.page.cart);
  const location = useLocation();

  return location.pathname !== CONSTANTS.CART_PATH ? (
    <div className="CartIcon">
      <Link className="CartIcon__link" to="/cart">
        <img src={cart} alt="cart icon" />
        {cartArray.length ? <span>{cartArray.length}</span> : null}
      </Link>
    </div>
  ) : null;
};

export default CartIcon;
