import React from "react";

const mockedData = {
  address: "Golubka 12-82, Minsk",
  phone: "+375291306780",
  email: "tronastya@yandex.ru",
};
const ProfileContacts: React.FC = () => {
  const objArray = Object.entries(mockedData);
  console.log(objArray);

  return (
    <>
      {objArray.map((arr) => (
        <div className="ProfilePage__field" key={arr[0]}>
          <label htmlFor={arr[0]}>{`${arr[0]}:`}</label>
          <input type="text" value={arr[1]} id={arr[0]} />
        </div>
      ))}
    </>
  );
};

export default ProfileContacts;
