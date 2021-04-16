import React from "react";
import { useDispatch, useSelector } from "react-redux";

import add from "images/add.svg";
import remove from "images/minus.svg";
import rubbish from "images/rubbish.svg";

import "./CartItem.scss";

import { IProducts, RootState } from "../../../utils/interfaces";
import { getDate, removeObjectFromArr } from "../../../utils";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

interface Props {
  product: IProducts;
  quantity: object;
  setQuantity: any;
}

const CartItem: React.FC<Props> = ({ product, quantity, setQuantity }) => {
  const cart = useSelector((state: RootState) => state.page.cart);
  const dispatch = useDispatch();

  const handleAddItem = (id: number) => {
    const newObj = { ...quantity };
    newObj[id] += 1;

    setQuantity(newObj);
    dispatch(PAGE_ACTIONS.setCart([product]));
  };

  const handleRemoveItem = (id: number) => {
    const newObj = { ...quantity };
    newObj[id] -= 1;

    setQuantity(newObj);
    removeObjectFromArr(cart, product.id);
  };

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
      <span className="CartItem__quantity">{`Qty: ${quantity[product.id]}`}</span>
      <div className="CartItem__controls">
        <button type="button" className="CartItem__btn CartItem__btn_add" onClick={() => handleAddItem(product.id)}>
          <img src={add} alt="add" />
        </button>
        <button
          type="button"
          className="CartItem__btn CartItem__btn_remove"
          onClick={() => handleRemoveItem(product.id)}
        >
          <img src={quantity[product.id] > 1 ? remove : rubbish} alt="remove" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
