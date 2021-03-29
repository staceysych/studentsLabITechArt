import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../Login/Login.scss";
import "./SignOut.scss";

import logout from "images/logout.svg";

import { Modal } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";

interface Props {
  handleSignOut: () => void;
  handleCloseModal: () => void;
}

const SignOut: React.FC<Props> = ({ handleCloseModal, handleSignOut }) => {
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    location.pathname && setTargetPath(location.pathname);
  }, []);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    handleCloseModal();
    history.push(targetPath);
  };

  const onSignOut = () => {
    handleSignOut();
    history.push("/");
    dispatch(ACTIONS.setUserName(""));
    dispatch(ACTIONS.setLoggedIn(false));
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
