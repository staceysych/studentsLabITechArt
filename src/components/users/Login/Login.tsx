import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./Login.scss";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import { IUserData, IErrors, validateLogin, validatePassword } from "../../../utils/index";

import Modal from "../../../elements/modal/index";
import Alert from "../../../elements/alert/Alert";

interface Props {
  userData: IUserData;
  handleUserInput: (userData) => void;
  handleCloseModal: () => void;
  handleSubmit: any;
  errors: IErrors;
  hasError: boolean;
  hideValidationError: () => void;
  handleErrors: (validationError) => void;
}

const Login: React.FC<Props> = ({
  handleCloseModal,
  userData,
  handleUserInput,
  handleSubmit,
  errors,
  hasError,
  hideValidationError,
  handleErrors,
}) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");
  const [inputText, setInput] = useState<IUserData>(userData);

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  useEffect(() => {
    if (hasError) {
      hideValidationError();
    }
  }, [inputText]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin(inputText.login, handleErrors) && validatePassword(inputText.password, handleErrors)) {
      await handleUserInput(inputText);
      const results = await handleSubmit(e);
      if (results) {
        if (targetPath) {
          history.push(targetPath);
        } else {
          history.push("/");
        }
      }
    }
  };

  return (
    <Modal handleCloseModal={closeModal}>
      <form method="post" className="Login">
        <h2 className="Login__title">Sign In</h2>
        <div className="Login__content">
          <label htmlFor="login">
            <span>
              <img src={user} alt="user" />
              Login:
            </span>
            <input
              key="login"
              type="text"
              placeholder="Enter Login"
              name="login"
              required
              value={inputText.login || userData.login}
              onChange={handleChange}
              ref={loginRef}
            />
          </label>
          <label htmlFor="password">
            <span>
              <img src={padlock} alt="padlock" />
              Password:
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={inputText.password || userData.password}
              onChange={handleChange}
              ref={passwordRef}
            />
          </label>
          <button type="submit" className="Login__btn" onClick={(e) => onSubmit(e)}>
            Enter
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password} />}
    </Modal>
  );
};

export default React.memo(Login);
