import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState, IErrors } from "../../utils/interfaces";

interface Props {
  component: any;
  path: string;
  handleErrors?: (validationErrors: any) => void;
  errors?: IErrors;
  hideValidationError?: () => void;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  handleErrors,
  errors,
  hideValidationError,
  ...rest
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} {...{ handleErrors, errors, hideValidationError }} />;
        }
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
      }}
    />
  );
};

export default ProtectedRoute;
