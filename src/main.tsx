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

interface AppState {
  isModalOpen: boolean;
  type: string;
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
    };
  }

  handleOpenModal = (type) => {
    this.setState({ isModalOpen: true, type });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header handleOpenModal={this.handleOpenModal} />
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
            {" "}
            {this.state.type === "sign-in" ? <Login /> : "Registration"}{" "}
          </Modal>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
