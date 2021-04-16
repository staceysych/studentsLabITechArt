import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../Login/Login.scss";
import "./SignOut.scss";

import logout from "images/logout.svg";

import { Modal } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";

import { CONSTANTS } from "../../../constants";

interface Props {}

const SignOut: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    dispatch(ACTIONS.setErrors(CONSTANTS.EMPTY_ERRORS));
    history.push(targetPath);
  };

  const onSignOut = () => {
    dispatch(ACTIONS.setAuthInfo("Successfully signed out"));
    dispatch(ACTIONS.setLoggedIn(false));
    dispatch(ACTIONS.setErrors(CONSTANTS.EMPTY_ERRORS));
    history.push("/");
  };

  return (
    <Modal handleCloseModal={closeModal}>
      <div className="SignOut">
        <h2 className="SignOut__title">Sign out?</h2>
        <div className="SignOut__img">
          <img src={logout} alt="logout" />
        </div>
        <button type="submit" className="Login__btn" onClick={onSignOut}>
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default SignOut;
