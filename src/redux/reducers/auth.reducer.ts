import { SET_USER_NAME, SET_LOGGED_IN, SET_ERROR, SET_USER_INFO } from "../actions/types";

import { getInitialState } from "../../utils";

export default function authReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case SET_ERROR:
      return { ...state, hasError: action.hasError };
    case SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
}
