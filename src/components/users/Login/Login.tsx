import React, { useRef, useEffect } from "react";

import "./Login.scss";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import { IUserData, IErrors } from "../../../utils/index";

interface Props {
  userData: IUserData;
  handleUserInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: IErrors;
}

const Login: React.FC<Props> = ({ userData, handleUserInput, handleSubmit, errors }) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (errors.login) {
      loginRef.current.focus();
    }

    if (errors.password) {
      passwordRef.current.focus();
    }
  }, [errors.login, errors.password]);

  return (
    <form method="post" className="Login">
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
        <button type="submit" className="Login__btn" onClick={handleSubmit}>
          Enter
        </button>
      </div>
    </form>
  );
};

export default Login;
