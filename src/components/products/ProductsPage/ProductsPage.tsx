import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar";
import { Select, Checkbox, Spinner } from "../../../elements";
import "./ProductsPage.scss";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

import { URLS, CONSTANTS } from "../../../constants";

import { RootState, IProducts } from "../../../utils/interfaces";
import { useFetchData, useDebounce, generateTitleSearch } from "../../../utils";

import GameCard from "../GameCard";

interface ParamTypes {
  param: string;
}

/*   useEffect(() => {
    dispatch(PAGE_ACTIONS.getProducts(`${SERVER_URL}${GET_PRODUCTS_URL}${param}${sort}&${type}`));
  }, [selectedText]); */

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const products = useSelector((state: RootState) => state.page.products);
  const { SERVER_URL, GET_PRODUCTS_URL } = URLS;

  const debouncedSearchText = useDebounce(searchText, CONSTANTS.DEBOUNCE_TIME);
  const { data, loading } = useFetchData(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${param}`);

  console.log("criteria: ", sortCriteria, "type: ", sortType);

  useEffect(() => {
    if (sortCriteria || sortType) {
      dispatch(
        PAGE_ACTIONS.getProducts(`${SERVER_URL}${GET_PRODUCTS_URL}${param}/${sortCriteria}&${sortType || "desc"}`)
      );
    }

    setLoading(false);
  }, [sortCriteria, sortType]);

  useEffect(() => {
    dispatch(PAGE_ACTIONS.setProducts(data));
  }, [data]);

  useEffect(() => {
    if (debouncedSearchText) {
      setLoading(true);
      const searchedProducts = data.filter((product) =>
        product.name.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
      );
      dispatch(PAGE_ACTIONS.setProducts(searchedProducts));
      setLoading(false);
    } else {
      dispatch(PAGE_ACTIONS.setProducts(data));
      setLoading(false);
    }
  }, [debouncedSearchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchText(event.target.value);
  };

  return (
    <div className="ProductsPage">
      <div className="ProductsPage__header">
        <h1>{param}</h1>
        <SearchBar handleChange={handleChange} />
      </div>
      <div className="ProductsPage__wrapper">
        <div className="ProductsPage__sort-container">
          <div className="ProductsPage__sort">
            <h2>Sort:</h2>
            <div className="ProductsPage__sort_field">
              <h4>Criteria: </h4>
              <Select optionsList={CONSTANTS.CRITERIA_OPTIONS} setSortState={setSortCriteria} />
            </div>
            <div className="ProductsPage__sort_field">
              <h4>Type: </h4>
              <Select optionsList={CONSTANTS.TYPE_OPTIONS} setSortState={setSortType} />
            </div>
            <h3>Genre: </h3>
            {CONSTANTS.GENRE_OPTIONS.map((genre) => (
              <div className="ProductsPage__sort_field" key={genre}>
                <Checkbox name={genre} checked={genre === "all" ? true : isChecked} />
                <label htmlFor={genre}>{genre}</label>
              </div>
            ))}
            <h3>Age: </h3>
            {CONSTANTS.AGE_OPTIONS.map((age) => (
              <div className="ProductsPage__sort_field" key={age}>
                <Checkbox name={age} checked={age === "all" ? true : isChecked} />
                <label htmlFor={age}>{age}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="ProductsPage__products">
          {!loading && !isLoading && debouncedSearchText && (
            <h2 className="ProductsPage__products-title">{generateTitleSearch(debouncedSearchText, products)}</h2>
          )}
          {loading || isLoading ? <Spinner /> : products.map((obj: IProducts) => <GameCard key={obj.name} obj={obj} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
