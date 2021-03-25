import { SET_USER_NAME } from "../types/index";

const setUserName = (username) => ({ type: SET_USER_NAME, username });

export default {
  setUserName,
};
