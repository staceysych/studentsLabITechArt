import { IErrors } from "./interfaces";

import { ACTIONS } from "../redux/actions/creators";

export const validateLogin = (login: string, dispatch) => {
  const errors: IErrors = {
    login: "",
  };
  let isValid: boolean = true;

  if (!login) {
    isValid = false;
    errors.login = "Please enter your username.";
  }

  if (login) {
    const re = /^\S*$/;
    if (login.length < 6 || !re.test(login)) {
      isValid = false;
      errors.login = "Please add at least 6 characters.";
    }
  }

  dispatch(ACTIONS.setErrors(errors));

  return isValid;
};
