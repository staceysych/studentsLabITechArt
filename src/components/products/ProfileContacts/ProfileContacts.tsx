import React from "react";
import { useSelector } from "react-redux";

import { RootState, IUserInfo } from "../../../utils/interfaces";

interface Props {
  changedContacts: IUserInfo;
  handleChange: (e) => void;
}

const ProfileContacts: React.FC<Props> = ({ changedContacts, handleChange }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const profileDataArr = Object.entries(userInfo).filter(
    (arr) => arr.includes("address") || arr.includes("phone") || arr.includes("email")
  );

  const generateInputType = (input) => {
    switch (input) {
      case "phone":
        return "tel";
      case "email":
        return "email";
      default:
        return "text";
    }
  };

  return (
    <>
      {profileDataArr.map((arr) => (
        <div className="ProfilePage__field" key={arr[0]}>
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

export default ProfileContacts;
