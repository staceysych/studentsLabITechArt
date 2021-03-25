import React from "react";

import "./Alert.scss";

interface Props {
  text: string;
  className?: string;
}

const Alert: React.FC<Props> = ({ text, className }) => {
  const styleName = ["Alert"];

  if (className) {
    styleName.push(className);
  }

  return <div className={styleName.join(" ")}>{text}</div>;
};

export default Alert;
