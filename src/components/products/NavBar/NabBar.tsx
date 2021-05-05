import React from "react";

import styles from "./NavBar.module.scss";

interface Props {
  children: React.ReactNode;
}

const NavBar: React.FC<Props> = ({ children }) => (
  <nav className={styles.wrapper}>
    <ul className={styles.nav}>{children}</ul>
  </nav>
);

export default NavBar;
