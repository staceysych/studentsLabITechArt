import React, { Component, lazy } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./styles/main.scss";

import Header from "./components/products/Header";
import HomePage from "./components/products/HomePage";
import Footer from "./components/products/Footer";
import ErrorBoundary from "./components/products/ErrorBoundary";
import Login from "./components/users/Login";
import Registration from "./components/users/Registration";
import SignOut from "./components/users/SignOut";
import ChangePassword from "./components/users/ChangePassword";
import CartIcon from "./components/products/CartIcon";
import SubmitModal from "./components/users/SubmitModal";
import AdminGameModal from "./components/users/AdminGameModal";

import { Alert, ProtectedRoute } from "./elements";

import { IAppState } from "./utils/interfaces";

import store from "./redux/index";
import { withSuspense } from "./utils";

const ProductsPage = withSuspense(lazy(() => import("./components/products/ProductsPage")));
const AboutPage = withSuspense(lazy(() => import("./components/products/AboutPage")));
const ProfilePage = withSuspense(lazy(() => import("./components/products/ProfilePage")));
const CartPage = withSuspense(lazy(() => import("./components/products/CartPage")));

const TestErrorComponent = () => {
  throw new Error("Error is in the render method");
};
class AppContainer extends Component<{}, IAppState> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            <div className="container">
              <CartIcon />
              <Switch>
                <Route component={HomePage} path="/" exact />
                <ProtectedRoute component={ProductsPage} path="/products/:param" />
                <ProtectedRoute component={AboutPage} path="/about" />
                <ProtectedRoute component={TestErrorComponent} path="/testError" />
                <ProtectedRoute component={ProfilePage} path="/profile" />
                <ProtectedRoute component={CartPage} path="/cart" />
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signUp">
                  <Registration />
                </Route>
                <Route path="/signOut">
                  <SignOut />
                </Route>
                <ProtectedRoute component={ChangePassword} path="/changePassword" />
                <Route render={() => <Redirect to={{ pathname: "/" }} />} />
              </Switch>
            </div>
            <Footer />
            <Alert />
            <SubmitModal />
            <AdminGameModal />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
