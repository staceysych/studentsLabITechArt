import React from "react";
import ReactDom from "react-dom";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/products/Header/index";
import HomePage from "./components/products/HomePage/HomePage";
import ProductsPage from "./components/products/ProductsPage/ProductsPage";
import AboutPage from "./components/products/AboutPage/AboutPage";
import Footer from "./components/products/Footer/Footer";

const AppContainer: React.FC = () => (
  <BrowserRouter>
    <Header />
    <div className="container">
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={ProductsPage} path="/products" />
        <Route component={AboutPage} path="/about" />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </div>
    <Footer />
  </BrowserRouter>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));
