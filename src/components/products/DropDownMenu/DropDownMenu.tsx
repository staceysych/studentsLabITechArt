import React from "react";

import "./DropDownMenu.scss";

interface Props {
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<Props> = ({ children }) => <div className="DropDownMenu">{children}</div>;

export default DropDownMenu;
