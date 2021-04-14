import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./CartPage.scss";

import CartItem from "../CartItem";

import { RootState, IProducts } from "../../../utils/interfaces";
import { getUniqueItems } from "../../../utils";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.page.cart);
  const [quantity, setQuantity] = useState<object>({});

  const countDuplicates = (values) =>
    values.reduce((acc, cur) => {
      acc[cur.id] = ++acc[cur.id] || 1;
      return acc;
    }, {});

  useEffect(() => {
    if (cart.length) {
      setQuantity(countDuplicates(cart));
    }
  }, [cart]);

  return (
    <div className="CartPage">
      <div className="CartPage__header">
        <h1>Order list</h1>
      </div>
      <div className="CartPage__wrapper">
        <div className="CartPage__items">
          {getUniqueItems(cart, "id").map((product: IProducts) => (
            <CartItem
              product={product}
              key={`${product.id}-${quantity[product.id]}`}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          ))}
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
};

export default CartPage;
