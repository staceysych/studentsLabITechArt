import React, { useState } from "react";

import "./Select.scss";

interface Props {
  optionsList: string[];
}
const Select: React.FC<Props> = ({ optionsList }) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("Select");

  const handleListDisplay = () => {
    setShowOptionList(!showOptionList);
  };

  const handleOptionClick = (e) => {
    setSelectedText(e.target.getAttribute("data-name"));
    setShowOptionList(false);
  };

  return (
    <div className="Select">
      <div className={showOptionList ? "Select__text Select__text_active" : "Select__text"} onClick={handleListDisplay}>
        {selectedText}
      </div>
      {showOptionList && (
        <ul className="Select__options">
          {optionsList.map((option) => (
            <li className="Select__option" data-name={option} key={option} onClick={handleOptionClick}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
