import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  path?: string;
  name: string;
  handleDropDownClick: () => void;
  icon: any;
}

const DropDownItem: React.FC<Props> = ({ path, name, handleDropDownClick, icon }) => (
  <NavLink className="DropDownMenu__item" to={path} onClick={handleDropDownClick}>
    <img className="DropDownMenu__icon" src={icon} alt={name} />
    {name}
  </NavLink>
);

export default DropDownItem;
