import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar";
import GameCard from "../GameCard";

import "./HomePage.scss";

import { searchGame, getTopProducts } from "./utils";
import { useDebounce, generateTitleSearch, convertDateToSec } from "../../../utils";
import { IGameObject } from "../../../utils/interfaces";
import { CONSTANTS } from "../../../constants";

const HomePage: React.FC = () => {
  const { DEBOUNCE_TIME } = CONSTANTS;
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Array<object>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [recentGames, setRecentGames] = useState<Array<object>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchText(event.target.value);
  };

  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_TIME);

  useEffect(() => {
    getTopProducts().then((data) => {
      setRecentGames(data);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchText) {
      setIsSearching(true);
      searchGame(debouncedSearchText).then((data) => {
        setIsSearching(false);
        setResults(data);
      });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchText]);

  return (
    <>
      <div className="HomePage__controls">
        <SearchBar {...{ handleChange, isSearching }} />
      </div>
      {!isSearching && <h2 className="HomePage__title">{generateTitleSearch(searchText, results)}</h2>}
      {isSearching && <h2 className="HomePage__title">Searching for results...</h2>}
      <div className="HomePage__content">
        {results.length && !isSearching
          ? results.map((obj: IGameObject) => <GameCard key={obj.name} obj={obj} />)
          : null}
        {!searchText && !results.length
          ? recentGames.slice(-3).map((obj: IGameObject) => <GameCard key={obj.name} obj={obj} />)
          : null}
      </div>
    </>
  );
};

export default HomePage;
