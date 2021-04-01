import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import avatar from "images/avatar.svg";
import edit from "images/edit.svg";
import { RootState, iUserInfo, IErrors } from "../../../utils/interfaces";

import ProfileContacts from "../ProfileContacts";

import { Button, Alert } from "../../../elements";

import { URLS } from "../../../constants";

import { validateLogin } from "../../../utils";

import { ACTIONS } from "../../../redux/actions/creators";

import "./ProfilePage.scss";

interface Props {
  handleErrors: (validationErrors: any) => void;
  errors: IErrors;
  hideValidationError: () => void;
}

const ProfilePage: React.FC<Props> = ({ handleErrors, errors, hideValidationError }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const [changedContacts, setChangedContacts] = useState<iUserInfo>(userInfo);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      hideValidationError();
    }
  }, [changedContacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedContacts({ ...changedContacts, [name]: value });
  };

  const onClick = async () => {
    const newObj = { ...userInfo, ...changedContacts };
    console.log(newObj);

    if (validateLogin(newObj.login, handleErrors)) {
      await dispatch(ACTIONS.saveProfile(`${URLS.SERVER_URL}${URLS.SAVE_PROFILE_URL}${userInfo.id}`, newObj));
    } else {
      dispatch(ACTIONS.setError(true));
    }
  };

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="ProfilePage__info">
        <div className="ProfilePage__userName">
          {isEditMode ? (
            <input type="text" name="login" value={changedContacts.login} id={userInfo.login} onChange={handleChange} />
          ) : (
            <h2>{userInfo.login}</h2>
          )}
          <button type="button" onClick={() => setEditMode(!isEditMode)}>
            <img src={edit} alt="edit" />
          </button>
          {hasError && <Alert text={errors.login} />}
        </div>
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
