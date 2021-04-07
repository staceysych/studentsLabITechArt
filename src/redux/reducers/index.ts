import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import errorsReducer from "./errors.reducer";
import pageReducer from "./page.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  page: pageReducer,
});
