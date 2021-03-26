import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

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

import { Alert, ProtectedRoute } from "./elements";

import { IAppState } from "./utils/interfaces";

import { CONSTANTS } from "./constants";

import store from "./redux/index";

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<{}, IAppState> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      type: "",
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
      errors: {},
    });
  };

  handleErrors = (validationErrors) => {
    this.setState({ errors: validationErrors, hasError: true });
  };

  handleSubmit = () => {
    this.setState({
      hasError: false,
      isModalOpen: false,
      isLoggedIn: true,
      info: "Successfully logged in",
    });
  };

  handleRegistration = () => {
    this.setState({
      hasError: false,
      isModalOpen: false,
      isLoggedIn: true,
      info: "Successfully signed in",
    });
  };

  handleSignOut = () => {
    this.setState({
      isModalOpen: false,
      isLoggedIn: false,
      info: "Successfully signed out",
    });
  };

  hideValidationError = () => {
    this.setState({
      hasError: false,
      errors: {},
    });
  };

  render() {
    const { isLoggedIn, errors, isModalOpen, type, info, hasError } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header handleOpenModal={this.handleOpenModal} isLoggedIn={isLoggedIn} />
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
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
