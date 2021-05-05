import React from "react";
import { useDispatch, useSelector } from "react-redux";

import add from "images/add.svg";
import remove from "images/minus.svg";
import rubbish from "images/rubbish.svg";

import styles from "./CartItem.module.scss";

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
    <div className={styles.CartItem}>
      <div className={styles.poster}>
        <img src={product.poster} alt="poster" />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.devise}>{product.devise}</span>
      </div>
      <span className={styles.price}>
        Price: <span>{`$${product.price}`}</span>
      </span>
      <span>{`Order Date: ${getDate(true)}`}</span>
      <span>{`Qty: ${quantity[product.id]}`}</span>
      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={() => handleAddItem(product.id)}>
          <img src={add} alt="add" />
        </button>
        <button type="button" className={`${styles.btn} ${styles.remove}`} onClick={() => handleRemoveItem(product.id)}>
          <img src={quantity[product.id] > 1 ? remove : rubbish} alt="remove" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
