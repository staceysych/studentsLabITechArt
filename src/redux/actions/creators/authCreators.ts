import { SET_USER_NAME, SET_LOGGED_IN, SET_ERROR } from "../types/index";

import { IUserData } from "../../../utils/interfaces";

const setUserName = (userName: string) => ({ type: SET_USER_NAME, userName });
const setLoggedIn = (isLoggedIn: boolean) => ({ type: SET_LOGGED_IN, isLoggedIn });
const setError = (hasError: boolean) => ({ type: SET_ERROR, hasError });

const loginUser = (url: string, body: IUserData) => async (dispatch) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    dispatch(setLoggedIn(true));
    dispatch(setUserName(body.login));
    dispatch(setError(false));
  } else {
    console.log("error");
  }
};

export default {
  setUserName,
  setLoggedIn,
  loginUser,
  setError,
};
