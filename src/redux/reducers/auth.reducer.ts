import { SET_USER_DATA } from "../actions/types";

import { getInitialState } from "../../utils";

export default function authReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.userData };
    default:
      return state;
  }
}
