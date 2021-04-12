export default {
  DEBOUNCE_TIME: 400,
  PASSWORD_RGX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/i,
  PHONE_RGX: /^[0-9]+$/i,
  EMAIL_RGX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD_VALIDATION_TEXT: "Please add at least 6 characters, one digit, uppercase character, special character",
  PASSWORD_TEXT: "Please enter your password.",
  PREV_PASSWORD_TEXT: "Please enter your current password.",
  PASSWORD_NOT_MATCH: "Password does not match the existing one",
  CONFIRM_PASSWORD_TEXT: "Please enter your confirm password.",
  PASSWORDS_NO_MATCH: "Passwords don't match.",
  PHONE_TEXT: "Please enter your phone number.",
  PHONE_VALIDATION_TEXT: "Your phone number must be 10 digits max, only digits",
  EMAIL_TEXT: "Please enter your email.",
  EMAIL_VALIDATION_TEXT: "Invalid email. Make sure you include @ and .",
  TIMEOUT: 2000,
  SIGN_OUT: "signOut",
  EMPTY_USER_DATA: {
    login: "",
    password: "",
    confirmPassword: "",
  },
  EMPTY_ERRORS: {
    login: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  },
};
