import React, { useState, useEffect } from "react";

import "./Select.scss";

interface Props {
  optionsList: string[];
  setSortState: any;
  isDefault: boolean;
}
const Select: React.FC<Props> = ({ optionsList, setSortState, isDefault }) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("Select");

  console.log("isDefault", isDefault);

  useEffect(() => {
    if (isDefault) {
      setSelectedText("Select");
    }
  }, [isDefault]);

  useEffect(() => {
    if (selectedText !== "Select") {
      if (selectedText === "descending") {
        setSortState("desc");
      } else if (selectedText === "ascending") {
        setSortState("asc");
      } else {
        setSortState(selectedText);
      }
    }
  }, [selectedText]);

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
