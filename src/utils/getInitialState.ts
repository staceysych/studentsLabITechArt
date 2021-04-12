export const getInitialState = () => ({
  isLoggedIn: false,
  hasError: false,
  userInfo: {
    login: "",
    password: "",
    address: "",
    phone: "",
    email: "",
  },
  isModalOpen: false,
  authInfo: "",
  errors: {
    login: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  },
});
