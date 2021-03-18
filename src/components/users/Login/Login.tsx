import React from "react";

import "./Login.scss";

const Login = () => (
  <form method="post" className="Login">
    <h2 className="Login__title">Sing In</h2>
    <div className="Login__content">
      <label htmlFor="login">
        <b>Login:</b>
        <input type="text" placeholder="Enter Login" name="login" required />
      </label>
      <label htmlFor="password">
        <b>Password:</b>
        <input type="text" placeholder="Enter Password" name="password" required />
      </label>
      <button type="submit" className="Login__btn">
        Enter
      </button>
    </div>
  </form>
);

export default Login;
