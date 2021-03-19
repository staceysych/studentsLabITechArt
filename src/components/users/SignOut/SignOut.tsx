import React from "react";

import "../Login/Login.scss";
import "./SignOut.scss";

import logout from "images/logout.svg";

interface Props {
  handleSignOut: () => void;
}

const SignOut: React.FC<Props> = ({ handleSignOut }) => (
  <div className="SignOut">
    <h2 className="SignOut__title">Sign out?</h2>
    <div className="SignOut__img">
      <img src={logout} alt="logout" />
    </div>
    <button type="submit" className="Login__btn" onClick={handleSignOut}>
      Ok
    </button>
  </div>
);

export default SignOut;
