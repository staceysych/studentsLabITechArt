import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import user from "images/user.svg";
import padlock from "images/padlock.svg";

import "../Login/Login.scss";
import "./Registration.scss";

import { validateLogin, validatePassword } from "../../../utils";
import { IUserData, IErrors, ILocation, RootState } from "../../../utils/interfaces";
import { Modal, Alert } from "../../../elements";

import { ACTIONS } from "../../../redux/actions/creators";
import { CONSTANTS, URLS } from "../../../constants";

interface Props {
  handleCloseModal: () => void;
  errors: IErrors;
  hideValidationError: () => void;
  handleErrors: (validationError) => void;
}

const Registration: React.FC<Props> = ({ handleCloseModal, errors, hideValidationError, handleErrors }) => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const history = useHistory();
  const location = useLocation<ILocation>();
  const [targetPath, setTargetPath] = useState<string>("");
  const [inputText, setInput] = useState<IUserData>({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const hasError = useSelector((state: RootState) => state.auth.hasError);

  const dispatch = useDispatch();

  useEffect(() => {
    location.state && setTargetPath(location.state.from.pathname);
  }, []);

  useEffect(() => {
    if (hasError) {
      dispatch(ACTIONS.setError(false));
      hideValidationError();
    }
  }, [inputText]);

  useEffect(() => {
    if (errors.login) {
      loginRef.current.focus();
    }

    if (errors.password) {
      passwordRef.current.focus();
    }

    if (errors.confirmPassword) {
      confirmRef.current.focus();
    }
  }, [errors.login, errors.password, errors.confirmPassword]);

  const closeModal = () => {
    dispatch(ACTIONS.setError(false));
    handleCloseModal();
    history.push(targetPath);
    setInput(CONSTANTS.EMPTY_USER_DATA);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...inputText, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const needsToConfirm = true;

    try {
      if (
        validateLogin(inputText.login, handleErrors) &&
        validatePassword(inputText.password, handleErrors, inputText.confirmPassword, needsToConfirm)
      ) {
        await dispatch(
          ACTIONS.loginUser(`${URLS.SERVER_URL}${URLS.SIGN_UP}`, {
            ...inputText,
            address: "",
            phone: "",
            email: "",
          })
        );
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
      <form method="post" className="Login">
        <h2 className="Login__title">Registration</h2>
        <div className="Login__content">
          <label htmlFor="login">
            <span>
              <img src={user} alt="user" />
              Login:
            </span>
            <input
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
          <label htmlFor="password">
            <span>
              <img src={padlock} alt="padlock" />
              Confirm Password:
            </span>
            <input
              type="password"
              placeholder="Enter confirm password"
              name="confirmPassword"
              required
              value={inputText.confirmPassword}
              onChange={handleChange}
              ref={confirmRef}
            />
          </label>
          <button type="submit" className="Login__btn Registration__btn" onClick={onSubmit}>
            Registration
          </button>
        </div>
      </form>
      {hasError && <Alert text={errors.login || errors.password || errors.confirmPassword} />}
    </Modal>
  );
};

export default Registration;
