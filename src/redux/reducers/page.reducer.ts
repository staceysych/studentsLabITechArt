import { SET_PRODUCTS, SET_CART, CLEAR_CART } from "../actions/types";

import { getInitialState } from "../../utils";

export default function pageReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    case SET_CART:
      return { ...state, cart: [...state.cart, ...action.product] };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
}
