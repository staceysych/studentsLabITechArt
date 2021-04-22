import { SET_PRODUCTS, SET_CART, CLEAR_CART, SET_CARD_ACTION, SET_EDIT_GAME_ID, SET_LOADING } from "../types/index";

import { IProducts } from "../../../utils/interfaces";
import { URLS } from "../../../constants";

const setProducts = (products: IProducts[]) => ({ type: SET_PRODUCTS, products });
const setCart = (product: IProducts[]) => ({ type: SET_CART, product });
const clearCart = () => ({ type: CLEAR_CART });
const setCardAction = (cardAction: string) => ({ type: SET_CARD_ACTION, cardAction });
const setEditGame = (editGameObj: IProducts) => ({ type: SET_EDIT_GAME_ID, editGameObj });
const setLoading = (isLoading: boolean) => ({ type: SET_LOADING, isLoading });

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
      await dispatch(getProducts(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${body.devise}`));
    }
  } else {
    console.log("error");
  }
};

const editProduct = (url: string, body: IProducts, location: string) => async (dispatch) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    if (location.includes(body.devise)) {
      await dispatch(getProducts(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${body.devise}`));
    } else {
      await dispatch(getProducts(`${URLS.SERVER_URL}api${location}`));
    }
  }
};

const deleteProduct = (url: string, body: IProducts) => async (dispatch) => {
  const response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    await dispatch(getProducts(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${body.devise}`));
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
  setEditGame,
  editProduct,
  setLoading,
  deleteProduct,
};
