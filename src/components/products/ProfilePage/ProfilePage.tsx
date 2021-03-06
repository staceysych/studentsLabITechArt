import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import avatar from "images/avatar.svg";
import { RootState, IUserInfo } from "../../../utils/interfaces";

import ProfileContacts from "../ProfileContacts";

import { Button, Alert } from "../../../elements";

import { URLS, CONSTANTS } from "../../../constants";

import { validateLogin, validatePhone, validateEmail } from "../../../utils";

import { ACTIONS } from "../../../redux/actions/creators";

import styles from "./ProfilePage.module.scss";

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const userNameRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const errors = useSelector((state: RootState) => state.auth.errors);
  const [changedContacts, setChangedContacts] = useState<IUserInfo>(userInfo);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      dispatch(ACTIONS.setErrors(CONSTANTS.EMPTY_ERRORS));
    }
  }, [changedContacts]);

  useEffect(() => {
    if (errors.login) {
      userNameRef.current.focus();
    }
  }, [errors.login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedContacts({ ...changedContacts, [name]: value });
  };

  const onClick = async () => {
    const newObj = { ...userInfo, ...changedContacts };

    if (
      validateLogin(newObj.login, dispatch) &&
      validatePhone(newObj.phone, dispatch) &&
      validateEmail(newObj.email, dispatch)
    ) {
      await dispatch(ACTIONS.saveProfile(`${URLS.SERVER_URL}${URLS.SAVE_PROFILE_URL}${userInfo.id}`, newObj));
      setChangedContacts(newObj);
    } else {
      dispatch(ACTIONS.setError(true));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={styles.info}>
        <div className={styles.contacts}>
          <div className={styles.field}>
            <label htmlFor="login">User name:</label>
            <input
              type="text"
              name="login"
              value={changedContacts.login}
              id={userInfo.login}
              onChange={handleChange}
              ref={userNameRef}
            />
            {hasError && <Alert text={errors.login || errors.phone || errors.email} />}
          </div>
          <ProfileContacts {...{ changedContacts, handleChange }} />
        </div>
        <div className={styles.controls}>
          <Button text="Save contacts" className={`${styles.btn} ${styles.save}`} onClick={onClick} />
          <Button
            text="Change password"
            className={`${styles.btn} ${styles.changePassword}`}
            onClick={() => history.push("/changePassword")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
