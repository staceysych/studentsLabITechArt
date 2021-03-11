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
interface AppProps {}

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("You have an error", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      window.alert("Ops, error");
      window.location.href = "/";
    }

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
          <TestErrorComponent />
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
