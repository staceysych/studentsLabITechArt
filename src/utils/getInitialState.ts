export const getInitialState = () => ({
  userName: "",
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
});
