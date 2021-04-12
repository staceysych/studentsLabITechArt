import { IErrors } from "./interfaces";
import { CONSTANTS } from "../constants";
import { ACTIONS } from "../redux/actions/creators";

export const validatePrevPassword = (dispatch, userPassword: string, inputPassword: string) => {
  const errors: IErrors = {
    prevPassword: "",
  };
  let isValid: boolean = true;
  if (!inputPassword) {
    isValid = false;
    errors.prevPassword = CONSTANTS.PREV_PASSWORD_TEXT;
  }

  if (inputPassword) {
    if (userPassword !== inputPassword) {
      isValid = false;
      errors.prevPassword = CONSTANTS.PASSWORD_NOT_MATCH;
    }
  }

  dispatch(ACTIONS.setErrors(errors));

  return isValid;
};
