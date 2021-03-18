import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./NavItem.scss";

interface Props {
  path?: string;
  name: string;
  handleDropDownClick?: () => void;
  isOpen?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<Props> = ({ path, name, handleDropDownClick, isOpen, children }) => {
  const location = useLocation();
  const className: string[] = ["NavBar__link nav__btn"];
  if (location.pathname.includes("products")) {
    className.push(" active");
  }
  return (
    <li>
      {handleDropDownClick ? (
        <button type="button" className={className.join("")} onClick={handleDropDownClick}>
          {name}
        </button>
      ) : (
        <NavLink className="NavBar__link" to={path} exact>
          {name}
        </NavLink>
      )}
      {isOpen && children}
    </li>
  );
};

export default NavItem;
