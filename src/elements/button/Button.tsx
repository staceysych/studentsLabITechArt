import React from "react";

interface Props {
  text: string;
  className: string;
}

const Button: React.FC<Props> = ({ text, className }) => (
  <button type="button" className={className}>
    {text}
  </button>
);

export default Button;
