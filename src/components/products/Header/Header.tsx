import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Header.scss";

import NavBar from "../NavBar";
import NavItem from "../NavItem";
import DropDownMenu from "../DropDownMenu";
import DropDownItem from "../DropDownItem";

import { dropDownData } from "./utils";
import { CONSTANTS } from "../../../constants";

import { RootState } from "../../../utils/interfaces";

interface Props {
  handleOpenModal: (type: string) => void;
}

const Header: React.FC<Props> = ({ handleOpenModal }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
        {isLoggedIn ? (
          <>
            <NavItem path="/profile" name={userName} />
            <button type="button" onClick={() => handleOpenModal(CONSTANTS.SIGN_OUT)}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <NavItem path="/login" isOpen name="Sign in" />
            <NavItem path="/signUp" isOpen name="Registration" />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
