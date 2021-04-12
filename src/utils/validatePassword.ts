import { IErrors } from "./interfaces";
import { CONSTANTS } from "../constants";

import { ACTIONS } from "../redux/actions/creators";

export const validatePassword = (dispatch, password: string, confirmPassword?: string, needsToConfirm?: boolean) => {
  const errors: IErrors = {
    login: "",
    password: "",
    confirmPassword: "",
  };
  let isValid: boolean = true;

  if (!password) {
    isValid = false;
    errors.password = CONSTANTS.PASSWORD_TEXT;
  }

  if (password) {
    const strongRegex = CONSTANTS.PASSWORD_RGX;

    if (!strongRegex.test(password)) {
      isValid = false;
      errors.password = CONSTANTS.PASSWORD_VALIDATION_TEXT;
    }
  }

  if (needsToConfirm) {
    if (password) {
      if (!confirmPassword) {
        isValid = false;
        errors.confirmPassword = CONSTANTS.CONFIRM_PASSWORD_TEXT;
      }
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        isValid = false;
        errors.confirmPassword = CONSTANTS.PASSWORDS_NO_MATCH;
      }
    }
  }

  dispatch(ACTIONS.setErrors(errors));

  return isValid;
};
