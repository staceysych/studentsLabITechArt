import React from "react";

import "./CartPage.scss";

import CartItem from "../CartItem";

const CartPage = () => (
  <div className="CartPage">
    <div className="CartPage__header">
      <h1>Order list</h1>
    </div>
    <div className="CartPage__wrapper">
      <div className="CartPage__items">
        <CartItem />
      </div>
      <div className="CartPage__total">
        <h4>
          Total items: <span>1</span>
        </h4>
        <h4>
          Total payment: <span>$120</span>
        </h4>
        <div className="CartPage__controls">
          <span>Current Balance: $0</span>
          <button type="button" className="CartPage__btn">
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CartPage;
