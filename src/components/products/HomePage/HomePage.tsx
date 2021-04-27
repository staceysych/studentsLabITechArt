import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar";
import GameCard from "../GameCard";

import "./HomePage.scss";

import { searchGame } from "./utils";
import { useDebounce, generateTitleSearch } from "../../../utils";
import { RootState, IProducts } from "../../../utils/interfaces";
import { CONSTANTS, URLS } from "../../../constants";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

const HomePage: React.FC = () => {
  const { DEBOUNCE_TIME } = CONSTANTS;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Array<object>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const recentProducts = useSelector((state: RootState) => state.page.recentProducts);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchText(event.target.value);
  };

  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_TIME);

  useEffect(() => {
    dispatch(PAGE_ACTIONS.getRecentProducts(`${URLS.SERVER_URL}${URLS.TOP_PRODUCTS_URL}`));
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
        {results.length && !isSearching ? results.map((obj: IProducts) => <GameCard key={obj.name} obj={obj} />) : null}
        {!searchText && !results.length
          ? recentProducts && recentProducts.slice(-3).map((obj: IProducts) => <GameCard key={obj.name} obj={obj} />)
          : null}
      </div>
    </>
  );
};

export default HomePage;
