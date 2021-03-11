import React, { Component } from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/products/Header";
import HomePage from "./components/products/HomePage";
import ProductsPage from "./components/products/ProductsPage";
import AboutPage from "./components/products/AboutPage";
import Footer from "./components/products/Footer";

interface AppState {
  hasError: boolean;
}

const TestErrorComponent = ({ testError }) => (
  <button type="button" onClick={testError}>
    Throw error
  </button>
);
class AppContainer extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
    if (this.state.hasError) {
      console.log("this is an error", error);
      console.log("this is an error info", errorInfo);
    }
  }

  testError = () => {
    try {
      throw new Error("Error is in the render method");
    } catch (e) {
      return window.alert(e);
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route component={HomePage} path="/" exact />
            <Route component={ProductsPage} path="/products" />
            <Route component={AboutPage} path="/about" />
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
          <TestErrorComponent testError={this.testError} />
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
