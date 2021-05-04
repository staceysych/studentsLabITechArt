import React from "react";

import styles from "./DropDownMenu.module.scss";

interface Props {
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<Props> = ({ children }) => <div className={styles.wrapper}>{children}</div>;

export default DropDownMenu;
