import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import avatar from "images/avatar.svg";
import { RootState, iUserInfo } from "../../../utils/interfaces";
import ProfileContacts from "../ProfileContacts";
import { Button } from "../../../elements";

import { URLS } from "../../../constants";

import { ACTIONS } from "../../../redux/actions/creators";

import "./ProfilePage.scss";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.auth.userName);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [changedContacts, setChangedContacts] = useState<iUserInfo>(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedContacts({ ...changedContacts, [name]: value });
  };

  const onClick = async () => {
    const newObj = { ...userInfo, ...changedContacts };

    await dispatch(ACTIONS.saveProfile(`${URLS.SERVER_URL}${URLS.SAVE_PROFILE_URL}${userInfo.id}`, newObj));
  };

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="ProfilePage__info">
        <h2>{userName}</h2>
        <div className="ProfilePage__contacts">
          <ProfileContacts {...{ changedContacts, handleChange }} />
        </div>
        <div className="ProfilePage__controls">
          <Button text="Save contacts" className="ProfilePage__btn ProfilePage__btn_save" onClick={onClick} />
          <Button text="Change password" className="ProfilePage__btn ProfilePage__btn_changePassword" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
