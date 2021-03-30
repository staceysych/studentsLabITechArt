import { SET_USER_NAME, SET_LOGGED_IN, SET_ERROR, SET_USER_INFO } from "../types/index";

import { IUserData, iUserInfo } from "../../../utils/interfaces";
import { URLS } from "../../../constants";

const setUserName = (userName: string) => ({ type: SET_USER_NAME, userName });
const setLoggedIn = (isLoggedIn: boolean) => ({ type: SET_LOGGED_IN, isLoggedIn });
const setError = (hasError: boolean) => ({ type: SET_ERROR, hasError });
const setUserInfo = (userInfo: iUserInfo) => ({ type: SET_USER_INFO, userInfo });

const getUserProfile = (userName: string, password: string, history) => async (dispatch) => {
  const { SERVER_URL, GET_PROFILE_URL } = URLS;
  const response = await fetch(`${SERVER_URL}${GET_PROFILE_URL}${userName}&${password}`);
  const data = await response.json();

  if (data.length) {
    dispatch(setUserInfo(data[0]));
    dispatch(setLoggedIn(true));
    dispatch(setUserName(userName));
    dispatch(setError(false));
  } else {
    dispatch(setLoggedIn(false));
    history.push("/signUp");
  }
};

const loginUser = (url: string, body: IUserData, history) => async (dispatch) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    dispatch(getUserProfile(body.login, body.password, history));
  } else {
    console.log("error");
  }
};

export default {
  setUserName,
  setLoggedIn,
  loginUser,
  setError,
  getUserProfile,
};
