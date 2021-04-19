import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Header.scss";

import NavBar from "../NavBar";
import NavItem from "../NavItem";
import DropDownMenu from "../DropDownMenu";
import DropDownItem from "../DropDownItem";

import { dropDownData } from "./utils";

import { RootState } from "../../../utils/interfaces";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const closeDropDown = () => {
      setOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", closeDropDown);
    }

    return () => {
      document.removeEventListener("click", closeDropDown);
    };
  }, [isOpen]);

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
            <NavItem path="/profile" name={userInfo.login} />
            <NavItem path="/signOut" isOpen name="Sign out" />
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
