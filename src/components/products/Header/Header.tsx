import React, { useState } from "react";
import { connect } from "react-redux";

import "./Header.scss";

import NavBar from "../NavBar";
import NavItem from "../NavItem";
import DropDownMenu from "../DropDownMenu";
import DropDownItem from "../DropDownItem";

import { dropDownData } from "./utils";
import { CONSTANTS } from "../../../constants";

import { IUserData } from "../../../utils/interfaces";

interface Props {
  handleOpenModal: (type: string) => void;
  isLoggedIn: boolean;
  userData: IUserData;
}

const Header: React.FC<Props> = ({ handleOpenModal, isLoggedIn, userData }) => {
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
        {isLoggedIn ? (
          <>
            <h2 className="Header__userName">{userData.login}</h2>
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

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps, {})(Header);
