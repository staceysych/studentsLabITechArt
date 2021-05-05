import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../utils/interfaces";

import { ACTIONS } from "../../redux/actions/creators";
import { CONSTANTS } from "../../constants";

import styles from "./Alert.module.scss";

interface Props {
  text?: string;
}

const Alert: React.FC<Props> = ({ text }) => {
  const authInfo = useSelector((state: RootState) => state.auth.authInfo);
  const hasError = useSelector((state: RootState) => state.auth.hasError);
  const dispatch = useDispatch();
  const styleName = [styles.wrapper];
  const noUserAlert = authInfo === "No such user. Please sign up";

  useEffect(() => {
    let timer;
    if (authInfo) {
      timer = setTimeout(() => {
        dispatch(ACTIONS.setAuthInfo(""));
      }, CONSTANTS.TIMEOUT);
    } else {
      clearTimeout(timer);
    }
  }, [authInfo]);

  if (!hasError && !noUserAlert) {
    styleName.push("success");
  }

  return authInfo || text ? <div className={styleName.join(" ")}>{text || authInfo}</div> : null;
};

export default Alert;
