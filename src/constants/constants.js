export default {
  DEBOUNCE_TIME: 400,
  PASSWORD_RGX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/gi,
  PASSWORD_VALIDATION_TEXT: "Please add at least 6 characters, one digit, uppercase character, special character",
  PASSWORD_TEXT: "Please enter your password.",
  PREV_PASSWORD_TEXT: "Please enter your current password.",
  PASSWORD_NOT_MATCH: "Password does not match the existing one",
  CONFIRM_PASSWORD_TEXT: "Please enter your confirm password.",
  PASSWORDS_NO_MATCH: "Passwords don't match.",
  TIMEOUT: 2000,
  SIGN_OUT: "signOut",
  EMPTY_USER_DATA: {
    login: "",
    password: "",
    confirmPassword: "",
  },
};
