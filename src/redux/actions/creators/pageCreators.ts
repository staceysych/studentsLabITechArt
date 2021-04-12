import { SET_PRODUCTS, SET_CART } from "../types/index";

import { IProducts } from "../../../utils/interfaces";

const setProducts = (products: IProducts[]) => ({ type: SET_PRODUCTS, products });
const setCart = (productId: number) => ({ type: SET_CART, productId });

const getProducts = (url: string) => async (dispatch) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 200) {
    dispatch(setProducts(data));
  }
};

export default {
  getProducts,
  setProducts,
  setCart,
};
