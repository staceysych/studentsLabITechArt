import React from "react";
import { useSelector } from "react-redux";

import { RootState, IUserInfo } from "../../../utils/interfaces";
import { generateInputType } from "./utils";

import styles from "../ProfilePage/ProfilePage.module.scss";

interface Props {
  changedContacts: IUserInfo;
  handleChange: (e) => void;
}

const ProfileContacts: React.FC<Props> = ({ changedContacts, handleChange }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const profileDataArr = Object.entries(userInfo).filter(
    (arr) => arr.includes("address") || arr.includes("phone") || arr.includes("email")
  );

  return (
    <>
      {profileDataArr.map((arr) => (
        <div className={styles.field} key={arr[0]}>
          <label htmlFor={arr[0]}>{`${arr[0]}:`}</label>
          <input
            type={generateInputType(arr[0])}
            name={arr[0]}
            value={changedContacts[arr[0]]}
            id={arr[0]}
            onChange={handleChange}
          />
        </div>
      ))}
    </>
  );
};

const shouldReRender = (prevProps, nextProps) => {
  if (JSON.stringify(prevProps.changedContacts) !== JSON.stringify(nextProps.changedContacts)) {
    return false;
  }

  return true;
};

export default React.memo(ProfileContacts, shouldReRender);
