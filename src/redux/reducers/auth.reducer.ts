import { SET_USER_NAME } from "../actions/types";

const initialState = [];

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };
    default:
      return state;
  }
}
