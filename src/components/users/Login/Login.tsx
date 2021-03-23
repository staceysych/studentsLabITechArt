import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./Login.scss";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import { IUserData, IErrors } from "../../../utils/index";

import Modal from "../../../elements/modal/index";
import Alert from "../../../elements/alert/alert";

interface Props {
  userData: IUserData;
  handleUserInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  handleSubmit: any;
  errors: IErrors;
  hasError: boolean;
}

const Login: React.FC<Props> = ({ handleCloseModal, userData, handleUserInput, handleSubmit, errors, hasError }) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  useEffect(() => {
    if (errors.login) {
      loginRef.current.focus();
    }

    if (errors.password) {
      passwordRef.current.focus();
    }
  }, [errors.login, errors.password]);

  const closeModal = () => {
    handleCloseModal();
    history.push("/");
  };

  return (
    <Modal handleCloseModal={closeModal}>
      <form method="post" className="Login" onSubmit={() => history.push("/")}>
        <h2 className="Login__title">Sing In</h2>
        <div className="Login__content">
          <label htmlFor="login">
            <span>
              <img src={user} alt="user" />
              Login:
            </span>
            <input
              type="text"
              placeholder="Enter Login"
              name="login"
              required
              value={userData.login || ""}
              onChange={handleUserInput}
              ref={loginRef}
            />
          </label>
          <label htmlFor="password">
            <span>
              <img src={padlock} alt="padlock" />
              Password:
            </span>
            <input
              type="text"
              placeholder="Enter Password"
              name="password"
              required
              value={userData.password || ""}
              onChange={handleUserInput}
              ref={passwordRef}
            />
          </label>
          <button
            type="submit"
            className="Login__btn"
            onClick={(e) => {
              handleSubmit(e).then((result) => {
                if (result) {
                  if (targetPath) {
                    history.push(targetPath);
                  } else {
                    history.push("/");
                  }
                }
              });
            }}
          >
            Enter
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password} />}
    </Modal>
  );
};

export default Login;
