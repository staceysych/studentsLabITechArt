import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import pageReducer from "./page.reducer";

export default combineReducers({
  auth: authReducer,
  page: pageReducer,
});
