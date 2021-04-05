import { SET_ERRORS } from "../actions/types";

import { getInitialState } from "../../utils";

export default function errorsReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
