import { SET_USER_DATA } from "../types/index";
import { IUserData } from "../../../utils/interfaces";

const setUserData = (userData: IUserData) => ({ type: SET_USER_DATA, userData });

export default {
  setUserData,
};
