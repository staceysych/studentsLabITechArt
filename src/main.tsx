import React, { Component } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/products/Header";
import HomePage from "./components/products/HomePage";
import ProductsPage from "./components/products/ProductsPage";
import AboutPage from "./components/products/AboutPage";
import ProfilePage from "./components/products/ProfilePage";
import Footer from "./components/products/Footer";
import ErrorBoundary from "./components/products/ErrorBoundary";
import Login from "./components/users/Login";
import Registration from "./components/users/Registration";
import SignOut from "./components/users/SignOut";
import Alert from "./elements/alert/Alert";
import { ProtectedRoute } from "./elements/index";

import { IUserData, IErrors, validateLogin, validatePassword } from "./utils";
import { postRequest } from "./api/utils/index";

import { URLS, CONSTANTS } from "./constants";

interface AppState {
  isModalOpen: boolean;
  type: string;
  userData: IUserData;
  isLogged: boolean;
  errors: IErrors;
  info: string;
  hasError: boolean;
}

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      type: "",
      userData: {
        login: "",
        password: "",
        confirmPassword: "",
      },
      isLogged: false,
      hasError: false,
      errors: {},
      info: "",
    };
  }

  componentDidUpdate() {
    let timer;
    if (this.state.info) {
      timer = setTimeout(() => {
        this.setState({
          info: "",
        });
      }, CONSTANTS.TIMEOUT);
    } else {
      clearTimeout(timer);
    }
  }

  handleOpenModal = (type: string) => {
    this.setState({ isModalOpen: true, type });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      hasError: false,
      userData: {
        login: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
    });
  };

  handleUserInput = async (userData) => {
    console.log("from login", userData);
    this.setState((prevState) => ({
      ...prevState,
      userData,
    }));
  };

  handleErrors = (validationErrors) => {
    this.setState({ errors: validationErrors, hasError: true });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { userData } = this.state;
    console.log(userData);
    try {
      if (validateLogin(userData.login, this.handleErrors) && validatePassword(userData.password, this.handleErrors)) {
        this.setState({ hasError: false });
        await postRequest(`${URLS.SERVER_URL}${URLS.SIGN_IN}`, userData);

        this.setState({
          isModalOpen: false,
          isLogged: true,
          info: "Successfully logged in",
        });

        return true;
      }
    } catch (error) {
      window.alert(error);
    }

    return false;
  };

  handleRegistration = async () => {
    const { userData } = this.state;
    try {
      if (
        validateLogin(userData.login, this.handleErrors) &&
        validatePassword(userData.password, this.handleErrors, true, userData.confirmPassword)
      ) {
        this.setState({ hasError: false });
        await postRequest(`${URLS.SERVER_URL}${URLS.SIGN_UP}`, userData);

        this.setState({
          isModalOpen: false,
          isLogged: true,
          info: "Successfully signed in",
        });

        return true;
      }
    } catch (error) {
      window.alert(error);
    }

    return false;
  };

  handleSignOut = () => {
    this.setState({
      isModalOpen: false,
      isLogged: false,
      info: "Successfully signed out",
      userData: {
        login: "",
        password: "",
        confirmPassword: "",
      },
    });
  };

  render() {
    const { userData, isLogged, errors, isModalOpen, type, info, hasError } = this.state;

    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header handleOpenModal={this.handleOpenModal} userName={userData.login || ""} isLogged={isLogged} />
          <div className="container">
            <Switch>
              <Route component={HomePage} path="/" exact />
              <ProtectedRoute isLogged={isLogged} component={ProductsPage} path="/products/:param" />
              <ProtectedRoute isLogged={isLogged} component={AboutPage} path="/about" />
              <ProtectedRoute isLogged={isLogged} component={TestErrorComponent} path="/testError" />
              <ProtectedRoute isLogged={isLogged} component={ProfilePage} path="/profile" />
              <Route
                path="/login"
                component={() => (
                  <Login
                    handleCloseModal={this.handleCloseModal}
                    userData={userData}
                    handleUserInput={this.handleUserInput}
                    handleSubmit={this.handleSubmit}
                    errors={errors}
                    hasError={hasError}
                  />
                )}
              />
              <Route
                path="/signUp"
                component={() => (
                  <Registration
                    handleCloseModal={this.handleCloseModal}
                    userData={userData}
                    handleUserInput={this.handleUserInput}
                    handleRegistration={this.handleRegistration}
                    errors={errors}
                    hasError={hasError}
                  />
                )}
              />
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </div>
          {type === "sign-out" && isModalOpen && (
            <SignOut handleCloseModal={this.handleCloseModal} handleSignOut={this.handleSignOut} />
          )}
          <Footer />
          {info && <Alert text={info} className="success" />}
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
