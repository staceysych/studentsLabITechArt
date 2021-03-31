import React from "react";

interface Props {
  text: string;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, className, onClick }) => (
  <button type="button" className={className} onClick={onClick}>
    {text}
  </button>
);

export default Button;
