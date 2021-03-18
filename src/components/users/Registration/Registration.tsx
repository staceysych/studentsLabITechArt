import React from "react";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import "../Login/Login.scss";
import "./Registration.scss";

const Registration = () => (
  <form method="post" className="Login">
    <h2 className="Login__title">Registration</h2>
    <div className="Login__content">
      <label htmlFor="login">
        <span>
          <img src={user} alt="user" />
          Login:
        </span>
        <input type="text" placeholder="Enter Login" name="login" required />
      </label>
      <label htmlFor="password">
        <span>
          <img src={padlock} alt="padlock" />
          Password:
        </span>
        <input type="text" placeholder="Enter Password" name="password" required />
      </label>
      <label htmlFor="password">
        <span>
          <img src={padlock} alt="padlock" />
          Password:
        </span>
        <input type="text" placeholder="Enter Password" name="password" required />
      </label>
      <button type="submit" className="Login__btn Registration__btn">
        Registration
      </button>
    </div>
  </form>
);

export default Registration;
