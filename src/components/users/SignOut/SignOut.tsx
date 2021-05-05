import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import logout from "images/logout.svg";

import { Modal } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";

import { CONSTANTS } from "../../../constants";

import styles from "./SignOut.module.scss";

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
      <div>
        <h2 className={styles.title}>Sign out?</h2>
        <div className={styles.img}>
          <img src={logout} alt="logout" />
        </div>
        <button type="submit" className="btn" onClick={onSignOut}>
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default SignOut;
