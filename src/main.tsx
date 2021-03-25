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

import { IUserData, IErrors } from "./utils";
import { postRequest } from "./api/utils/index";

import { URLS, CONSTANTS } from "./constants";

import AppContext from "./helpers/AppContext";

interface AppState {
  isModalOpen: boolean;
  type: string;
  userData: IUserData;
  isLoggedIn: boolean;
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
      isLoggedIn: false,
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
    this.setState((prevState) => ({
      ...prevState,
      userData,
    }));
  };

  handleErrors = (validationErrors) => {
    this.setState({ errors: validationErrors, hasError: true });
  };

  handleSubmit = async () => {
    const { userData } = this.state;
    try {
      this.setState({ hasError: false });
      await postRequest(`${URLS.SERVER_URL}${URLS.SIGN_IN}`, userData);

      this.setState({
        isModalOpen: false,
        isLoggedIn: true,
        info: "Successfully logged in",
      });

      return true;
    } catch (error) {
      window.alert(error);
    }

    return false;
  };

  handleRegistration = async () => {
    const { userData } = this.state;
    try {
      this.setState({ hasError: false });
      await postRequest(`${URLS.SERVER_URL}${URLS.SIGN_UP}`, userData);

      this.setState({
        isModalOpen: false,
        isLoggedIn: true,
        info: "Successfully signed in",
      });

      return true;
    } catch (error) {
      window.alert(error);
    }

    return false;
  };

  handleSignOut = () => {
    this.setState({
      isModalOpen: false,
      isLoggedIn: false,
      info: "Successfully signed out",
      userData: {
        login: "",
        password: "",
        confirmPassword: "",
      },
    });
  };

  hideValidationError = () => {
    this.setState({
      hasError: false,
      errors: {},
    });
  };

  render() {
    const { userData, isLoggedIn, errors, isModalOpen, type, info, hasError } = this.state;

    return (
      <AppContext.Provider value={this.state}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header handleOpenModal={this.handleOpenModal} userName={userData.login || ""} isLoggedIn={isLoggedIn} />
            <div className="container">
              <Switch>
                <Route component={HomePage} path="/" exact />
                <ProtectedRoute isLoggedIn={isLoggedIn} component={ProductsPage} path="/products/:param" />
                <ProtectedRoute isLoggedIn={isLoggedIn} component={AboutPage} path="/about" />
                <ProtectedRoute isLoggedIn={isLoggedIn} component={TestErrorComponent} path="/testError" />
                <ProtectedRoute isLoggedIn={isLoggedIn} component={ProfilePage} path="/profile" />
                <Route path="/login">
                  <Login
                    handleCloseModal={this.handleCloseModal}
                    userData={userData}
                    handleUserInput={this.handleUserInput}
                    handleSubmit={this.handleSubmit}
                    errors={errors}
                    hasError={hasError}
                    hideValidationError={this.hideValidationError}
                    handleErrors={this.handleErrors}
                  />
                </Route>
                <Route path="/signUp">
                  <Registration
                    handleCloseModal={this.handleCloseModal}
                    userData={userData}
                    handleUserInput={this.handleUserInput}
                    handleRegistration={this.handleRegistration}
                    errors={errors}
                    hasError={hasError}
                    hideValidationError={this.hideValidationError}
                    handleErrors={this.handleErrors}
                  />
                </Route>
                <Route render={() => <Redirect to={{ pathname: "/" }} />} />
              </Switch>
            </div>
            {type === CONSTANTS.SIGN_OUT && isModalOpen && (
              <SignOut handleCloseModal={this.handleCloseModal} handleSignOut={this.handleSignOut} />
            )}
            <Footer />
            {info && <Alert text={info} className="success" />}
          </ErrorBoundary>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
