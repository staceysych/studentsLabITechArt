import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "../Login/Login.scss";
import "./SignOut.scss";

import logout from "images/logout.svg";

import Modal from "../../../elements/modal/index";

interface Props {
  handleSignOut: () => void;
  handleCloseModal: () => void;
}

const SignOut: React.FC<Props> = ({ handleCloseModal, handleSignOut }) => {
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

  return (
    <Modal handleCloseModal={closeModal}>
      <div className="SignOut">
        <h2 className="SignOut__title">Sign out?</h2>
        <div className="SignOut__img">
          <img src={logout} alt="logout" />
        </div>
        <button
          type="submit"
          className="Login__btn"
          onClick={() => {
            handleSignOut();
            history.push("/");
          }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default SignOut;
