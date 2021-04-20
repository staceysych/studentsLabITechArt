import { SET_PRODUCTS, SET_CART, CLEAR_CART, SET_CARD_ACTION, ADD_PRODUCT } from "../types/index";

import { IProducts } from "../../../utils/interfaces";

const setProducts = (products: IProducts[]) => ({ type: SET_PRODUCTS, products });
const addToProducts = (newProduct: IProducts) => ({ type: ADD_PRODUCT, newProduct });
const setCart = (product: IProducts[]) => ({ type: SET_CART, product });
const clearCart = () => ({ type: CLEAR_CART });
const setCardAction = (cardAction: string) => ({ type: SET_CARD_ACTION, cardAction });

const getProducts = (url: string) => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 200) {
    dispatch(setProducts(data));
  }
};

const getCartProducts = (url: string) => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 200) {
    dispatch(setCart(data));
  }
};

const addNewProduct = (url: string, body: IProducts, location: string) => async (dispatch) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    if (location.includes(body.devise)) {
      await dispatch(addToProducts(body));
    }
  } else {
    console.log("error");
  }
};

export default {
  getProducts,
  setProducts,
  setCart,
  getCartProducts,
  clearCart,
  setCardAction,
  addNewProduct,
};
