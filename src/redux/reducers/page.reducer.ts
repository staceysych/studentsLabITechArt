import {
  SET_PRODUCTS,
  SET_CART,
  CLEAR_CART,
  SET_CARD_ACTION,
  SET_EDIT_GAME_ID,
  SET_LOADING,
  SET_ALL_PRODUCTS,
  SET_RECENT_PRODUCTS,
} from "../actions/types";

import { getInitialState } from "../../utils";

export default function pageReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
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
    case SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.allProducts };
    case SET_RECENT_PRODUCTS:
      return { ...state, recentProducts: action.recentProducts };
    default:
      return state;
  }
}
