import { SET_LOGGED_IN, SET_ERROR, SET_USER_INFO, SET_MODAL_OPEN, SET_AUTH_INFO, SET_ERRORS } from "../types/index";

import { IUserData, IUserInfo, IErrors } from "../../../utils/interfaces";
import { URLS, CONSTANTS } from "../../../constants";

const setLoggedIn = (isLoggedIn: boolean) => ({ type: SET_LOGGED_IN, isLoggedIn });
const setError = (hasError: boolean) => ({ type: SET_ERROR, hasError });
const setUserInfo = (userInfo: IUserInfo) => ({ type: SET_USER_INFO, userInfo });
const setModalOpen = (isModalOpen: boolean) => ({ type: SET_MODAL_OPEN, isModalOpen });
const setAuthInfo = (authInfo: string) => ({ type: SET_AUTH_INFO, authInfo });
const setErrors = (errors: IErrors) => ({ type: SET_ERRORS, errors });

const getUserProfile = (body: IUserData) => async (dispatch) => {
  const { SERVER_URL, GET_PROFILE_URL } = URLS;
  const response = await fetch(`${SERVER_URL}${GET_PROFILE_URL}${body.login}&${body.password}`);
  const data = await response.json();

  if (data.length) {
    dispatch(setUserInfo(data[0]));
    dispatch(setLoggedIn(true));
    dispatch(setAuthInfo("Successfully logged in"));
  } else {
    dispatch(setAuthInfo("No such user. Please sign up"));
    dispatch(setLoggedIn(false));
  }
};

const loginUser = (url: string, body: IUserData) => async (dispatch) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    await dispatch(getUserProfile(body));
  } else {
    console.log("error");
  }
};

const saveProfile = (url: string, body: IUserInfo) => async (dispatch) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    dispatch(setAuthInfo("Profile has been changed"));
    dispatch(setUserInfo(body));
    dispatch(setError(false));
    setErrors(CONSTANTS.EMPTY_ERRORS);
  }
};

const changePassword = (url: string, body: IUserInfo) => async (dispatch) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    dispatch(setAuthInfo("Password has been changed"));
    dispatch(setUserInfo(body));
  }
};

export default {
  setLoggedIn,
  loginUser,
  setError,
  getUserProfile,
  setModalOpen,
  setAuthInfo,
  setUserInfo,
  saveProfile,
  changePassword,
  setErrors,
};
