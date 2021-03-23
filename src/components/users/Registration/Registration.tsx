import React from "react";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import "../Login/Login.scss";
import "./Registration.scss";

import { IUserData } from "../../../utils/index";

interface Props {
  userData: IUserData;
  handleRegistration: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: string;
}

const Registration: React.FC<Props> = ({ userData, handleUserInput, handleRegistration, hasError }) => (
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
          style={hasError ? { border: "2px solid red" } : {}}
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
        />
      </label>
      <button type="submit" className="Login__btn Registration__btn" onClick={handleRegistration}>
        Registration
      </button>
    </div>
  </form>
);

export default Registration;
