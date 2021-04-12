import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../utils/interfaces";

interface Props {
  component: any;
  path: string;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
      }}
    />
  );
};

export default ProtectedRoute;
