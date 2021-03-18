import React, { useState, useEffect } from "react";

import SearchBar from "../SearchBar/index";
import GameCard from "../GameCard/index";

import "./HomePage.scss";

import { searchGame, getTopProducts, generateTitle } from "./utils/index";
import { useDebounce, IGameObject } from "../../../utils/index";
import { CONSTANTS } from "../../../constants/index";

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
      <SearchBar {...{ handleChange, isSearching }} />
      {!isSearching && <h2 className="HomePage__title">{generateTitle(searchText, results)}</h2>}
      {isSearching && <h2 className="HomePage__title">Searching for results...</h2>}
      <div className="HomePage__content">
        {results.length && !isSearching
          ? results.map((obj: IGameObject) => <GameCard key={Math.random()} obj={obj} />)
          : null}
        {!searchText && !results.length
          ? recentGames.slice(-3).map((obj: IGameObject) => <GameCard key={Math.random()} obj={obj} />)
          : null}
      </div>
    </>
  );
};

export default HomePage;
