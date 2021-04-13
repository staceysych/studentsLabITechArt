import React, { useState, useEffect } from "react";

import add from "images/add.svg";
import remove from "images/minus.svg";
import rubbish from "images/rubbish.svg";

import "./CartItem.scss";

import { useSelector } from "react-redux";
import { IProducts, RootState } from "../../../utils/interfaces";
import { getDate } from "../../../utils";

interface Props {
  product: IProducts;
}

const CartItem: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const cart = useSelector((state: RootState) => state.page.cart);

  return (
    <div className="CartItem">
      <div className="CartItem__poster">
        <img src={product.poster} alt="poster" />
      </div>
      <div className="CartItem__info">
        <span className="CartItem__name">{product.name}</span>
        <span className="CartItem__devise">{product.devise}</span>
      </div>
      <span className="CartItem__price">
        Price: <span>{`$${product.price}`}</span>
      </span>
      <span className="CartItem__date">{`Order Date: ${getDate()}`}</span>
      <span className="CartItem__quantity">{`Qty: ${quantity}`}</span>
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
};

export default CartItem;
