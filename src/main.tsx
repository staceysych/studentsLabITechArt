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

interface AppState {}
interface AppProps {}

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<AppProps, AppState> {
  render() {
    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <div className="container">
            <Switch>
              <Route component={HomePage} path="/" exact />
              <Route component={ProductsPage} path="/products" />
              <Route component={AboutPage} path="/about" />
              <Route component={TestErrorComponent} path="/testError" />
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </div>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
