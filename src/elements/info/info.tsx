import React from "react";

import "./info.scss";

interface Props {
  text: string;
}

const Info: React.FC<Props> = ({ text }) => <div className="Info">{text}</div>;

export default Info;
