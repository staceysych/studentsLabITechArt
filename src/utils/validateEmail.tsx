import { CONSTANTS } from "../constants";
import { IErrors } from "./interfaces";

import { ERRORS_ACTIONS } from "../redux/actions/creators";

export const validateEmail = (email: string, dispatch) => {
  const errors: IErrors = {
    email: "",
  };
  let isValid: boolean = true;

  if (!email) {
    isValid = false;
    errors.email = CONSTANTS.EMAIL_TEXT;
  }

  if (email) {
    const re = CONSTANTS.EMAIL_RGX;
    if (!re.test(email)) {
      isValid = false;
      errors.email = CONSTANTS.EMAIL_VALIDATION_TEXT;
    }
  }

  dispatch(ERRORS_ACTIONS.setErrors(errors));

  return isValid;
};
