import React, { useRef, useEffect } from "react";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import "../Login/Login.scss";
import "./Registration.scss";

import { IUserData, IErrors } from "../../../utils/index";

interface Props {
  userData: IUserData;
  handleRegistration: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: IErrors;
}

const Registration: React.FC<Props> = ({ userData, handleUserInput, handleRegistration, errors }) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

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

  return (
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
            value={userData.confirmPassword || ""}
            onChange={handleUserInput}
            ref={confirmRef}
          />
        </label>
        <button type="submit" className="Login__btn Registration__btn" onClick={handleRegistration}>
          Registration
        </button>
      </div>
    </form>
  );
};

export default Registration;
