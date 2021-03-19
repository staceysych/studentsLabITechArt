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
import SignOut from "./components/users/SignOut/index";

import { IUserData } from "./utils/index";

import { URLS } from "./constants/index";

interface AppState {
  isModalOpen: boolean;
  type: string;
  userData: IUserData;
  isLogged: boolean;
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
    };
  }

  handleOpenModal = (type) => {
    this.setState({ isModalOpen: true, type });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleUserInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URLS.SERVER_URL}${URLS.SIGN_IN}`, {
        method: "POST",
        body: JSON.stringify(this.state.userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      response.status === 201 && console.log("Logged in");
      this.setState({ isModalOpen: false, isLogged: true });
    } catch (error) {
      window.alert(error);
    }
  };

  handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URLS.SERVER_URL}${URLS.SIGN_UP}`, {
        method: "PUT",
        body: JSON.stringify(this.state.userData),
      });

      response.status === 200 && console.log("Signed up");
      this.setState({ isModalOpen: false, isLogged: true });
    } catch (error) {
      window.alert(error);
    }
  };

  handleSignOut = () => {
    this.setState({ isModalOpen: false, isLogged: false });
  };

  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header
            handleOpenModal={this.handleOpenModal}
            userName={this.state.userData.login || ""}
            isLogged={this.state.isLogged}
          />
          <div className="container">
            <Switch>
              <Route component={HomePage} path="/" exact />
              <Route component={ProductsPage} path="/products/:param" />
              <Route component={AboutPage} path="/about" />
              <Route component={TestErrorComponent} path="/testError" />
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </div>
          <Modal isOpen={this.state.isModalOpen} handleCloseModal={this.handleCloseModal}>
            {this.state.type === "sign-in" && (
              <Login
                userData={this.state.userData}
                handleUserInput={this.handleUserInput}
                handleSubmit={this.handleSubmit}
              />
            )}
            {this.state.type === "registration" && (
              <Registration
                userData={this.state.userData}
                handleUserInput={this.handleUserInput}
                handleRegistration={this.handleRegistration}
              />
            )}
            {this.state.type === "sign-out" && <SignOut handleSignOut={this.handleSignOut} />}
          </Modal>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
