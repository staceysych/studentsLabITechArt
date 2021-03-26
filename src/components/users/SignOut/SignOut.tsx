import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "../Login/Login.scss";
import "./SignOut.scss";

import logout from "images/logout.svg";

import { Modal } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";

import { IUserData } from "../../../utils/interfaces";
import { CONSTANTS } from "../../../constants";

interface Props {
  handleSignOut: () => void;
  handleCloseModal: () => void;
  setUserData: (userData: IUserData) => void;
}

const SignOut: React.FC<Props> = ({ handleCloseModal, handleSignOut, setUserData }) => {
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");

  useEffect(() => {
    location.pathname && setTargetPath(location.pathname);
  }, []);

  const closeModal = () => {
    handleCloseModal();
    history.push(targetPath);
  };

  const onSignOut = () => {
    handleSignOut();
    history.push("/");
    setUserData(CONSTANTS.EMPTY_USER_DATA);
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

export default connect(null, {
  setUserData: ACTIONS.setUserData,
})(SignOut);
