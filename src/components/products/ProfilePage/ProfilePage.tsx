import React from "react";
import { useSelector } from "react-redux";

import avatar from "images/avatar.svg";
import { RootState } from "../../../utils/interfaces";
import ProfileContacts from "../ProfileContacts";
import { Button } from "../../../elements";

import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const userName = useSelector((state: RootState) => state.auth.userName);

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="ProfilePage__info">
        <h2>{userName}</h2>
        <div className="ProfilePage__contacts">
          <ProfileContacts />
        </div>
        <div className="ProfilePage__controls">
          <Button text="Save contacts" className="ProfilePage__btn ProfilePage__btn_save" />
          <Button text="Change password" className="ProfilePage__btn ProfilePage__btn_changePassword" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
