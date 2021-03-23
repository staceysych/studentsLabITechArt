import { IErrors } from "./interfaces/IErrors";

export const validatePassword = (password: string, setErrors: Function, isRegistration?: boolean) => {
  const errors: IErrors = {
    login: "",
    password: "",
  };
  let isValid: boolean = true;
  if (!password) {
    isValid = false;
    errors.password = "Please enter your password.";
  }

  if (isRegistration) {
    /*  if (!confirm_password) {
      isValid = false;
      errors.confirm_password = "Please enter your confirm password.";
    } */
  }

  if (password) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/gi;

    if (!strongRegex.test(password)) {
      isValid = false;
      errors.password = "Please add at least 6 characters, one digit, uppercase character, special character";
    }
  }

  setErrors(errors);

  return isValid;
};
