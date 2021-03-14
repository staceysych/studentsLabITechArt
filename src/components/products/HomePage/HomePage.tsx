import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar/index";
import { searchGame } from "./utils/index";
import { useDebounce } from "../../../utils/index";
import { CONSTANTS } from "../../../constants/index";

const HomePage: React.FC = () => {
  const { DEBOUNCE_TIME } = CONSTANTS;
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Array<object>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchText(event.target.value);
  };

  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_TIME);

  useEffect(() => {
    if (debouncedSearchText) {
      setIsSearching(true);
      searchGame(debouncedSearchText).then((data) => {
        setIsSearching(false);
        setResults(data);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchText]);

  return (
    <>
      <SearchBar {...{ handleChange, isSearching }} />
      {results.map(({ id, name, poster }) => (
        <div key={id}>
          <h4>{name}</h4>
          <img src={poster} alt={name} />
        </div>
      ))}
    </>
  );
};

export default HomePage;
