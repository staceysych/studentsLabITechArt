import { IErrors } from "./interfaces";
import { CONSTANTS } from "../constants";

export const validatePrevPassword = (userPassword: string, inputPassword: string, setErrors: Function) => {
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

  setErrors(errors);

  return isValid;
};
