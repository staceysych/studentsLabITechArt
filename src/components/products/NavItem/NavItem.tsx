import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "../NavBar/NavBar.module.scss";

interface Props {
  path?: string;
  name: string;
  handleDropDownClick?: any;
  isOpen?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<Props> = ({ path, name, handleDropDownClick, isOpen, children }) => {
  const location = useLocation();
  const className: string[] = [`${styles.link} ${styles.btn}`];
  if (location.pathname.includes("products")) {
    className.push(" active");
  }
  return (
    <li>
      {handleDropDownClick ? (
        <button type="button" id={name} className={className.join("")} onClick={handleDropDownClick}>
          {name}
        </button>
      ) : (
        <NavLink className={styles.link} to={path} exact>
          {name}
        </NavLink>
      )}
      {isOpen && children}
    </li>
  );
};

export default NavItem;
