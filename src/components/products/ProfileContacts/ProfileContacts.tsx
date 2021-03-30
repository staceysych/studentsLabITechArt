import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../utils/interfaces";

const ProfileContacts: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const profileDataArr = Object.entries(userInfo).filter((arr) => !(arr.includes("login") || arr.includes("password")));

  return (
    <>
      {profileDataArr.map((arr) => (
        <div className="ProfilePage__field" key={arr[0]}>
          <label htmlFor={arr[0]}>{`${arr[0]}:`}</label>
          <input type="text" value={arr[1]} id={arr[0]} />
        </div>
      ))}
    </>
  );
};

export default ProfileContacts;
