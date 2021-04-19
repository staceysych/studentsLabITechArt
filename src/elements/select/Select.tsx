import React, { useState, useEffect } from "react";

import "./Select.scss";

import DropDownMenu from "../../components/products/DropDownMenu";
import DropDownItem from "../../components/products/DropDownItem";

interface Props {
  optionsList: string[];
  setSortState?: any;
  isDefault?: boolean;
}
const Select: React.FC<Props> = ({ optionsList, setSortState, isDefault }) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("Select");

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
        setSortState(selectedText.toLocaleLowerCase());
      }
    }
  }, [selectedText]);

  useEffect(() => {
    const closeDropDown = () => {
      setShowOptionList(false);
    };

    if (showOptionList) {
      document.addEventListener("click", closeDropDown);
    }

    return () => {
      document.removeEventListener("click", closeDropDown);
    };
  }, [showOptionList]);

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
        <DropDownMenu>
          {optionsList.map((option) => (
            <DropDownItem name={option} key={option} isSelect handleDropDownClick={handleOptionClick} />
          ))}
        </DropDownMenu>
      )}
    </div>
  );
};

export default Select;
