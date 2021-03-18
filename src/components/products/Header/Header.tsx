import React, { useState } from "react";

import "./Header.scss";

import NavBar from "../NavBar/index";
import NavItem from "../NavItem/index";
import DropDownMenu from "../DropDownMenu/index";
import DropDownItem from "../DropDownItem/index";

import { dropDownData } from "./utils/index";

interface Props {
  handleOpenModal: (type: string) => void;
}

const Header: React.FC<Props> = ({ handleOpenModal }) => {
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
      <div className="Header__signIn">
        <button type="button" onClick={() => handleOpenModal("sign-in")}>
          Sign In
        </button>
        <button type="button" onClick={() => handleOpenModal("registration")}>
          Registration
        </button>
      </div>
    </div>
  );
};

export default Header;
