import React from "react";

import "./Login.scss";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

const Login = () => (
  <form method="post" className="Login">
    <h2 className="Login__title">Sing In</h2>
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
      <button type="submit" className="Login__btn">
        Enter
      </button>
    </div>
  </form>
);

export default Login;
