import React from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
  component: any;
  path: string;
}

const ProtectedRoute: React.FC<Props> = ({ isLoggedIn, component: Component, path }) => (
  <Route
    {...path}
    render={(props) => {
      if (isLoggedIn) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
    }}
  />
);

export default ProtectedRoute;

/* <Redirect
  to={{
    pathname: "/",
    state: {
      from: props.location,
    },
  }}
/>; */
