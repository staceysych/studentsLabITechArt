import React from "react";

import add from "images/add.svg";
import remove from "images/minus.svg";
import rubbish from "images/rubbish.svg";

import "./CartItem.scss";

const CartItem = () => (
  <div className="CartItem">
    <div className="CartItem__poster">
      <img
        src="https://res.cloudinary.com/dfoobx4vi/image/upload/v1617716641/game-posters/PSP/poster_kgwkwi.png"
        alt=""
      />
    </div>
    <div className="CartItem__info">
      <span>Name</span>
      <span>PSP, Xbox</span>
    </div>
    <span className="CartItem__price">Price: $39</span>
    <span className="CartItem__date">Date: 13-04-2021</span>
    <span className="CartItem__quantity">Qty: 1</span>
    <div className="CartItem__controls">
      <button type="button" className="CartItem__btn CartItem__btn_add">
        <img src={add} alt="add" />
      </button>
      <button type="button" className="CartItem__btn CartItem__btn_remove">
        <img src={rubbish} alt="remove" />
      </button>
    </div>
  </div>
);

export default CartItem;
