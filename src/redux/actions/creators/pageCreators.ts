import { SET_PRODUCTS } from "../types/index";

import { IProducts } from "../../../utils/interfaces";

const setProducts = (products: IProducts[]) => ({ type: SET_PRODUCTS, products });

const getProducts = (url: string) => async (dispatch) => {
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 200) {
    dispatch(setProducts(data));
  }
};

export default {
  getProducts,
  setProducts,
};
