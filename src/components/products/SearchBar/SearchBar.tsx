import React from "react";

import "./SearchBar.scss";

import lens from "images/lens.svg";

import { Loader } from "../../../elements";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSearching?: boolean;
}

const SearchBar: React.FC<Props> = ({ handleChange, isSearching }) => {
  console.log("SearchBar");
  return (
    <div className="SearchBar">
      <input className="SearchBar__input" type="text" placeholder="Search" onChange={handleChange} />
      {isSearching ? (
        <Loader />
      ) : (
        <button type="button" className="SearchBar__btn">
          <img src={lens} alt="lens" />
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
