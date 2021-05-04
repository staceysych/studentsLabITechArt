import React from "react";

import lens from "images/lens.svg";
import styles from "./SearchBar.module.scss";

import { Loader } from "../../../elements";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSearching?: boolean;
}

const SearchBar: React.FC<Props> = ({ handleChange, isSearching }) => (
  <div className={styles.wrapper}>
    <input className={styles.input} type="text" placeholder="Search" onChange={handleChange} />
    {isSearching ? (
      <Loader />
    ) : (
      <button type="button" className={styles.btn}>
        <img src={lens} alt="lens" />
      </button>
    )}
  </div>
);

export default React.memo(SearchBar);
