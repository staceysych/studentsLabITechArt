import React from "react";

import "./NavBar.scss";

interface Props {
  children: React.ReactNode;
}

const NavBar: React.FC<Props> = ({ children }) => (
  <nav className="NavBar">
    <ul className="NavBar__nav">{children}</ul>
  </nav>
);

export default NavBar;
