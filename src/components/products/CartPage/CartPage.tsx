import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CartPage.module.scss";

import CartItem from "../CartItem";

import { RootState, IProducts } from "../../../utils/interfaces";
import { getUniqueItems, getTotalPrice, countDuplicates } from "../../../utils";

import { ACTIONS } from "../../../redux/actions/creators";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.page.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<object>({});

  const uniqueItems = useMemo(() => getUniqueItems(cart, "id"), [cart]);

  useEffect(() => {
    if (cart.length) {
      setQuantity(countDuplicates(cart));
    }
  }, [cart]);

  const onSubmit = () => {
    if (cart.length) {
      dispatch(ACTIONS.setModalOpen(true));
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Order list</h1>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.items}>
          {cart.length ? (
            uniqueItems.map((product: IProducts) => (
              <CartItem
                product={product}
                key={`${product.id}-${quantity[product.id]}`}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            ))
          ) : (
            <h3>The cart is empty</h3>
          )}
        </div>
        <div className={styles.total}>
          <h4>
            Total items: <span>{`${cart.length}`}</span>
          </h4>
          <h4>
            Total payment: <span>{`$${cart.length && getTotalPrice(cart)}`}</span>
          </h4>
          <div className={styles.controls}>
            <span>Current Balance: $0</span>
            <button type="button" className={styles.btn} onClick={onSubmit}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
