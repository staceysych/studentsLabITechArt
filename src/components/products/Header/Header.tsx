import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

const Header: React.FC = () => (
  <nav className="Header">
    <h2 className="Header__title">Best Games Market</h2>
    <ul className="Header__nav">
      <li>
        <NavLink className="Header__link" to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="Header__link" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink className="Header__link" to="/about">
          About
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Header;
