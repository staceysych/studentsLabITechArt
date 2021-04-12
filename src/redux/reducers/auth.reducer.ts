import { SET_LOGGED_IN, SET_ERROR, SET_USER_INFO, SET_MODAL_OPEN, SET_AUTH_INFO, SET_ERRORS } from "../actions/types";

import { getInitialState } from "../../utils";

export default function authReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case SET_ERROR:
      return { ...state, hasError: action.hasError };
    case SET_USER_INFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.userInfo } };
    case SET_MODAL_OPEN:
      return { ...state, isModalOpen: action.isModalOpen };
    case SET_AUTH_INFO:
      return { ...state, authInfo: action.authInfo };
    case SET_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
