import {
  SET_PRODUCTS,
  SET_CART,
  CLEAR_CART,
  SET_CARD_ACTION,
  ADD_PRODUCT,
  SET_EDIT_GAME_ID,
  SET_LOADING,
} from "../actions/types";

import { getInitialState } from "../../utils";

export default function pageReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.newProduct] };
    case SET_CART:
      return { ...state, cart: [...state.cart, ...action.product] };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case SET_CARD_ACTION:
      return { ...state, cardAction: action.cardAction };
    case SET_EDIT_GAME_ID:
      return { ...state, editGameObj: action.editGameObj };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
