import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  path?: string;
  name: string;
  handleDropDownClick?: any;
  icon?: any;
  isSelect?: boolean;
}

const DropDownItem: React.FC<Props> = ({ path, name, handleDropDownClick, icon, isSelect }) =>
  isSelect ? (
    <li className="DropDownMenu__item" data-name={name} onClick={handleDropDownClick}>
      {name}
    </li>
  ) : (
    <NavLink className="DropDownMenu__item" to={path} onClick={handleDropDownClick}>
      <img className="DropDownMenu__icon" src={icon} alt={name} />
      {name}
    </NavLink>
  );

export default DropDownItem;
