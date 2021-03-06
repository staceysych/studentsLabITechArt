import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import { validateLogin, validatePassword } from "../../../utils";
import { IUserData, ILocation, RootState } from "../../../utils/interfaces";

import { Modal, Alert } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";
import { CONSTANTS, URLS } from "../../../constants";

import styles from "./Login.module.scss";

interface Props {}

const Login: React.FC<Props> = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [targetPath, setTargetPath] = useState<string>("");
  const [inputText, setInput] = useState<IUserData>({ login: "", password: "" });
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const errors = useSelector((state: RootState) => state.auth.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      dispatch(ACTIONS.setErrors(CONSTANTS.EMPTY_ERRORS));
    }
  }, [inputText]);

  useEffect(() => {
    if (errors.login) {
      loginRef.current.focus();
    }

    if (errors.password) {
      passwordRef.current.focus();
    }
  }, [errors.login, errors.password]);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    dispatch(ACTIONS.setErrors(CONSTANTS.EMPTY_ERRORS));
    history.push("/");
    setInput(CONSTANTS.EMPTY_USER_DATA);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateLogin(inputText.login, dispatch) && validatePassword(dispatch, inputText.password)) {
        await dispatch(ACTIONS.loginUser(`${URLS.SERVER_URL}${URLS.SIGN_IN}`, inputText));

        if (targetPath) {
          history.push(targetPath);
        } else {
          history.push("/");
        }
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
        <h2 className={styles.title}>Sign In</h2>
        <div className={styles.content}>
          <label htmlFor="login">
            <span>
              <img src={user} alt="user" />
              Login:
            </span>
            <input
              key="login"
              type="text"
              placeholder="Enter Login"
              name="login"
              required
              value={inputText.login}
              onChange={handleChange}
              ref={loginRef}
            />
          </label>
          <label htmlFor="password">
            <span>
              <img src={padlock} alt="padlock" />
              Password:
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={inputText.password}
              onChange={handleChange}
              ref={passwordRef}
            />
          </label>
          <button type="submit" className="btn" onClick={(e) => onSubmit(e)}>
            Enter
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password} />}
    </Modal>
  );
};

export default Login;
