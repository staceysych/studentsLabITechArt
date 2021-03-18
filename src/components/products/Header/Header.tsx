import React, { useState } from "react";

import "./Header.scss";

import NavBar from "../NavBar/index";
import NavItem from "../NavItem/index";
import DropDownMenu from "../DropDownMenu/index";
import DropDownItem from "../DropDownItem/index";

import { dropDownData } from "./utils/index";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleDropDownClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="Header">
      <h2 className="Header__title">Best Games Market</h2>
      <NavBar>
        <NavItem path="/" name="Home" />
        <NavItem name="Products" handleDropDownClick={handleDropDownClick} isOpen={isOpen}>
          <DropDownMenu>
            {dropDownData.map((obj) => (
              <DropDownItem
                key={Math.random()}
                path={obj.path}
                name={obj.name}
                handleDropDownClick={handleDropDownClick}
                icon={obj.icon}
              />
            ))}
          </DropDownMenu>
        </NavItem>
        <NavItem path="/about" name="About" />
      </NavBar>
    </div>
  );
};

export default Header;
