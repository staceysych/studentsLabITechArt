import React, { useState, useEffect, useMemo } from "react";

import DropDownMenu from "../../components/products/DropDownMenu";
import DropDownItem from "../../components/products/DropDownItem";

import styles from "./Select.module.scss";

interface Props {
  optionsList: string[];
  setSortState?: any;
  isDefault?: boolean;
  setInput?: any;
  name?: string;
  propsText?: string;
}
const Select: React.FC<Props> = ({ optionsList, setSortState, isDefault, setInput, name, propsText }) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("Select");
  const selectOptions = useMemo(() => optionsList, []);

  useEffect(() => {
    if (propsText && propsText !== "0") {
      setSelectedText(propsText);
    }
  }, [propsText]);

  useEffect(() => {
    if (isDefault) {
      setSelectedText("Select");
    }
  }, [isDefault]);

  useEffect(() => {
    if (setSortState) {
      if (selectedText !== "Select") {
        if (selectedText === "descending") {
          setSortState("desc");
        } else if (selectedText === "ascending") {
          setSortState("asc");
        } else {
          setSortState(selectedText.toLocaleLowerCase());
        }
      }
    }

    if (setInput) {
      setInput((prevState) => ({ ...prevState, [name]: selectedText === "Select" ? "" : selectedText }));
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

  const handleListDisplay = (e) => {
    setShowOptionList(!showOptionList);
  };

  const handleOptionClick = (e) => {
    setSelectedText(e.target.getAttribute("data-name"));
    setShowOptionList(false);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={showOptionList ? `${styles.text} ${styles.active}` : styles.text}
        onClick={handleListDisplay}
        name={name}
      >
        {selectedText}
      </div>
      {showOptionList && (
        <DropDownMenu>
          {selectOptions.map((option) => (
            <DropDownItem name={option} key={option} isSelect handleDropDownClick={handleOptionClick} />
          ))}
        </DropDownMenu>
      )}
    </div>
  );
};

export default React.memo(Select);
