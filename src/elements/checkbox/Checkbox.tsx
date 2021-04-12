import React from "react";

import "./Checkbox.scss";

interface Props {
  selected: string;
  onChange: any;
  text: string;
  value: string;
}

const Checkbox: React.FC<Props> = ({ selected, onChange, text, value }) => (
  <div
    className="Checkbox"
    onClick={() => {
      onChange(value);
    }}
  >
    <div className={`Checkbox__circle_outer ${value !== selected && "unselected"}`}>
      <div className={`Checkbox__circle_inner ${value !== selected && "unselected-circle"}`} />
    </div>
    <div className="Checkbox__label">{text}</div>
  </div>
);

export default Checkbox;
