import { CONSTANTS } from "../constants";
import { IErrors } from "./interfaces";

import { ACTIONS } from "../redux/actions/creators";

export const validatePhone = (phone: string, dispatch) => {
  const errors: IErrors = {
    phone: "",
  };
  let isValid: boolean = true;

  if (!phone) {
    isValid = false;
    errors.phone = CONSTANTS.PHONE_TEXT;
  }

  if (phone) {
    const re = CONSTANTS.PHONE_RGX;
    if (phone.length >= 10 || !re.test(phone)) {
      isValid = false;
      errors.phone = CONSTANTS.PHONE_VALIDATION_TEXT;
    }
  }

  dispatch(ACTIONS.setErrors(errors));

  return isValid;
};
