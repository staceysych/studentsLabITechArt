import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Modal, Button, Alert } from "../../../elements";

import { IUserData, RootState } from "../../../utils/interfaces";
import { validatePrevPassword, validatePassword } from "../../../utils";

import { ACTIONS } from "../../../redux/actions/creators";

import { CONSTANTS, URLS } from "../../../constants";

import styles from "./ChangePassword.module.scss";

interface Props {}

const ChangePassword: React.FC<Props> = () => {
  const prevPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const errors = useSelector((state: RootState) => state.auth.errors);
  const [inputText, setInput] = useState<IUserData>({ password: "", confirmPassword: "" });
  const [oldPassword, setOldPassword] = useState<string>("");

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      dispatch(ACTIONS.setErrors({}));
    }
  }, [inputText, oldPassword]);

  useEffect(() => {
    if (errors.prevPassword) {
      prevPasswordRef.current.focus();
    }

    if (errors.password) {
      passwordRef.current.focus();
    }

    if (errors.confirmPassword) {
      confirmRef.current.focus();
    }
  }, [errors.prevPassword, errors.password, errors.confirmPassword]);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    dispatch(ACTIONS.setErrors({}));
    history.push("/profile");
    setInput(CONSTANTS.EMPTY_USER_DATA);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
  };

  const onSubmit = async (e) => {
    const needsToConfirm = true;
    e.preventDefault();
    try {
      if (
        validatePrevPassword(dispatch, userInfo.password, oldPassword) &&
        validatePassword(dispatch, inputText.password, inputText.confirmPassword, needsToConfirm)
      ) {
        const newObj = { ...userInfo, ...inputText };
        await dispatch(ACTIONS.changePassword(`${URLS.SERVER_URL}${URLS.CHANGE_PASSWORD_URL}${userInfo.id}`, newObj));
        history.push("/profile");
      } else {
        dispatch(ACTIONS.setError(true));
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Modal handleCloseModal={closeModal}>
      <form method="post" className={styles.wrapper}>
        <h2 className={styles.title}>Change Password</h2>
        <div className={styles.content}>
          <div>
            <label htmlFor="prevPassword">Previous Password:</label>
            <input
              key="prevPassword"
              type="password"
              placeholder="Enter your previous password"
              name="prevPassword"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              ref={prevPasswordRef}
            />
          </div>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              placeholder="Enter a new password"
              name="password"
              required
              value={inputText.password}
              onChange={handleChange}
              ref={passwordRef}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder="Enter a confirm password"
              name="confirmPassword"
              required
              value={inputText.confirmPassword}
              onChange={handleChange}
              ref={confirmRef}
            />
          </div>
          <Button
            text="Update password"
            className={`${styles.btn} ${styles.changePassword}`}
            onClick={(e) => onSubmit(e)}
          />
        </div>
      </form>
      {hasError && <Alert text={errors.prevPassword || errors.password || errors.confirmPassword} />}
    </Modal>
  );
};

export default ChangePassword;
