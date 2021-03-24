import { IErrors } from "./interfaces/IErrors";

export const validateLogin = (login: string, setErrors: Function) => {
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

  setErrors(errors);

  return isValid;
};
