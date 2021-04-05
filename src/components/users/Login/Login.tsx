import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Login.scss";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import { validateLogin, validatePassword } from "../../../utils";
import { IUserData, ILocation, RootState } from "../../../utils/interfaces";

import { Modal, Alert } from "../../../elements";

import { ACTIONS, ERRORS_ACTIONS } from "../../../redux/actions/creators";
import { CONSTANTS, URLS } from "../../../constants";

interface Props {}

const Login: React.FC<Props> = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [targetPath, setTargetPath] = useState<string>("");
  const [inputText, setInput] = useState<IUserData>({ login: "", password: "" });
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const errors = useSelector((state: RootState) => state.errors.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      dispatch(ERRORS_ACTIONS.setErrors({}));
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
    dispatch(ERRORS_ACTIONS.setErrors({}));
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
      <form method="post" className="Login">
        <h2 className="Login__title">Sign In</h2>
        <div className="Login__content">
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
          <button type="submit" className="Login__btn" onClick={(e) => onSubmit(e)}>
            Enter
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password} />}
    </Modal>
  );
};

export default Login;
