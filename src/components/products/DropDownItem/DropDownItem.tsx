import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../DropDownMenu/DropDownMenu.module.scss";

interface Props {
  path?: string;
  name: string;
  handleDropDownClick?: any;
  icon?: any;
  isSelect?: boolean;
}

const DropDownItem: React.FC<Props> = ({ path, name, handleDropDownClick, icon, isSelect }) =>
  isSelect ? (
    <li className={styles.item} data-name={name} onClick={handleDropDownClick}>
      {name}
    </li>
  ) : (
    <NavLink className={styles.item} to={path} onClick={handleDropDownClick}>
      <img className={styles.icon} src={icon} alt={name} />
      {name}
    </NavLink>
  );

export default DropDownItem;
