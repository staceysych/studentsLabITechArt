import { IErrors } from "./interfaces/IErrors";
import { CONSTANTS } from "../constants/index";

export const validatePassword = (
  password: string,
  setErrors: Function,
  isRegistration?: boolean,
  confirmPassword?: string
) => {
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

  if (isRegistration) {
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

  setErrors(errors);

  return isValid;
};
