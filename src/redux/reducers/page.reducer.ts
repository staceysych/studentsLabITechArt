import { SET_PRODUCTS } from "../actions/types";

import { getInitialState } from "../../utils";

export default function pageReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
}
