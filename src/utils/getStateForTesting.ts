export const getStateForTesting = () => ({
  auth: {
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
  },
  page: {
    products: [
      {
        name: "",
        rating: 0,
        price: 0,
        poster: "",
        date: "",
        genre: "",
        age: "",
        devise: "",
      },
    ],
    recentProducts: [
      {
        name: "",
        rating: 0,
        price: 0,
        poster: "",
        date: "",
        genre: "",
        age: "",
        devise: "",
      },
    ],
    cart: [],
    cardAction: "",
  },
});