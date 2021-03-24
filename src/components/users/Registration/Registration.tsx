import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import "../Login/Login.scss";
import "./Registration.scss";

import { IUserData, IErrors } from "../../../utils/index";

import Modal from "../../../elements/modal/index";
import Alert from "../../../elements/alert/Alert";

interface Props {
  userData: IUserData;
  handleRegistration: any;
  handleUserInput: (userData) => void;
  handleCloseModal: () => void;
  errors: IErrors;
  hasError: boolean;
}

const Registration: React.FC<Props> = ({
  handleCloseModal,
  userData,
  handleUserInput,
  handleRegistration,
  errors,
  hasError,
}) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const [targetPath, setTargetPath] = useState<string>("");
  const [inputText, setInput] = useState<object>(userData);

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

    if (errors.confirmPassword) {
      confirmRef.current.focus();
    }
  }, [errors.login, errors.password, errors.confirmPassword]);

  const closeModal = () => {
    handleCloseModal();
    history.push(targetPath);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
  };

  const onSubmit = async () => {
    await handleUserInput(inputText);
    const results = await handleRegistration();
    results && history.push("/profile");
  };

  return (
    <Modal handleCloseModal={closeModal}>
      <form method="post" className="Login">
        <h2 className="Login__title">Registration</h2>
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
              type="text"
              placeholder="Enter Password"
              name="password"
              required
              value={inputText.password || userData.password}
              onChange={handleChange}
              ref={passwordRef}
            />
          </label>
          <label htmlFor="password">
            <span>
              <img src={padlock} alt="padlock" />
              Password:
            </span>
            <input
              type="text"
              placeholder="Enter confirm password"
              name="confirmPassword"
              required
              value={inputText.confirmPassword || userData.confirmPassword}
              onChange={handleChange}
              ref={confirmRef}
            />
          </label>
          <button type="submit" className="Login__btn Registration__btn" onClick={onSubmit}>
            Registration
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password || errors.confirmPassword} />}
    </Modal>
  );
};

export default Registration;
