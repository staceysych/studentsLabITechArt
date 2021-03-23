import React, { Component } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/products/Header";
import HomePage from "./components/products/HomePage";
import ProductsPage from "./components/products/ProductsPage";
import AboutPage from "./components/products/AboutPage";
import Footer from "./components/products/Footer";
import ErrorBoundary from "./components/products/ErrorBoundary";
import Modal from "./elements/modal";
import Login from "./components/users/Login";
import Registration from "./components/users/Registration";
import SignOut from "./components/users/SignOut";
import Alert from "./elements/alert/alert";

import { IUserData, IErrors, validateLogin, validatePassword } from "./utils";

import { URLS } from "./constants";

interface AppState {
  isModalOpen: boolean;
  type: string;
  userData: IUserData;
  isLogged: boolean;
  errors: IErrors;
  info: string;
}
interface AppProps {}

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      type: "",
      userData: {
        login: "",
        password: "",
      },
      isLogged: false,
      errors: {},
      info: "",
    };
  }

  componentDidUpdate() {
    setTimeout(() => this.setState({ info: "" }), 7000);
  }

  handleOpenModal = (type) => {
    this.setState({ isModalOpen: true, type });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: value,
      },
    }));
  };

  handleErrors = (validationErrors) => {
    this.setState({ errors: validationErrors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        validateLogin(this.state.userData.login, this.handleErrors) &&
        validatePassword(this.state.userData.password, this.handleErrors)
      ) {
        await fetch(`${URLS.SERVER_URL}${URLS.SIGN_IN}`, {
          method: "POST",
          body: JSON.stringify(this.state.userData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.setState({ isModalOpen: false, isLogged: true, info: "Successfully logged in" });
      }
    } catch (error) {
      window.alert(error);
    }
  };

  handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${URLS.SERVER_URL}${URLS.SIGN_UP}`, {
        method: "POST",
        body: JSON.stringify(this.state.userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.setState({ isModalOpen: false, isLogged: true, info: "Successfully signed in" });
    } catch (error) {
      window.alert(error);
    }
  };

  handleSignOut = () => {
    this.setState({ isModalOpen: false, isLogged: false, info: "Successfully signed out" });
  };

  render() {
    const { userData, isLogged, errors, isModalOpen, type, info } = this.state;
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header handleOpenModal={this.handleOpenModal} userName={userData.login || ""} isLogged={isLogged} />
          <div className="container">
            <Switch>
              <Route component={HomePage} path="/" exact />
              <Route component={ProductsPage} path="/products/:param" />
              <Route component={AboutPage} path="/about" />
              <Route component={TestErrorComponent} path="/testError" />
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </div>
          <Modal isOpen={isModalOpen} handleCloseModal={this.handleCloseModal}>
            {type === "sign-in" && (
              <Login
                userData={userData}
                handleUserInput={this.handleUserInput}
                handleSubmit={this.handleSubmit}
                errors={errors}
              />
            )}
            {type === "registration" && (
              <Registration
                userData={userData}
                handleUserInput={this.handleUserInput}
                handleRegistration={this.handleRegistration}
                hasError={errors.password}
              />
            )}
            {type === "sign-out" && <SignOut handleSignOut={this.handleSignOut} />}
            {errors.login && <Alert text={errors.login} />}
            {errors.password && <Alert text={errors.password} />}
          </Modal>
          <Footer />
          {info && <Alert text={info} className="success" />}
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
