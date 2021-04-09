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

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [isDefault, setDefault] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [genreName, setGenreName] = useState<string>("");
  const [ageValue, setAgeValue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const products = useSelector((state: RootState) => state.page.products);
  const { SERVER_URL, GET_PRODUCTS_URL } = URLS;

  const debouncedSearchText = useDebounce(searchText, CONSTANTS.DEBOUNCE_TIME);
  const { data, loading } = useFetchData(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${param}`);

  useEffect(() => {
    (async () => {
      if (sortCriteria || sortType) {
        if (!isLoading) {
          setLoading(true);
          setDefault(false);
          await dispatch(
            PAGE_ACTIONS.getProducts(`${SERVER_URL}${GET_PRODUCTS_URL}${param}/${sortCriteria}&${sortType || "desc"}`)
          );
          setLoading(false);
        }
      }
    })();
  }, [sortCriteria, sortType]);

  useEffect(() => {
    (async () => {
      if (genreName || ageValue) {
        if (!isLoading) {
          console.log(genreName);
          console.log(ageValue);
          setLoading(true);
          setDefault(false);
          const sortedProducts = data.filter((product) => {
            if (genreName) {
              if (ageValue) {
                console.log("im here");
                return (
                  product.genre.toLocaleLowerCase().includes(genreName.toLocaleLowerCase()) && +product.age >= +ageValue
                );
              }
              return product.genre.toLocaleLowerCase().includes(genreName.toLocaleLowerCase());
            }

            return false;
          });

          console.log(sortedProducts);
          await dispatch(PAGE_ACTIONS.setProducts(sortedProducts));
          setLoading(false);
        }
      }
    })();
  }, [genreName, ageValue]);

  useEffect(() => {
    setDefault(true);
    dispatch(PAGE_ACTIONS.setProducts(data));
  }, [data]);

  useEffect(() => {
    if (debouncedSearchText) {
      const searchedProducts = data.filter((product) =>
        product.name.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
      );
      dispatch(PAGE_ACTIONS.setProducts(searchedProducts));
      setLoading(false);
    } else {
      setLoading(false);
      dispatch(PAGE_ACTIONS.setProducts(data));
    }
  }, [debouncedSearchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefault(true);
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
              <Select optionsList={CONSTANTS.CRITERIA_OPTIONS} setSortState={setSortCriteria} isDefault={isDefault} />
            </div>
            <div className="ProductsPage__sort_field">
              <h4>Type: </h4>
              <Select optionsList={CONSTANTS.TYPE_OPTIONS} setSortState={setSortType} isDefault={isDefault} />
            </div>
            <h3>Genre: </h3>
            {CONSTANTS.GENRE_OPTIONS.map((genre) => (
              <div className="ProductsPage__sort_field" key={genre}>
                <Checkbox value={genre} selected={genreName} text={genre} onChange={setGenreName} />
              </div>
            ))}
            <h3>Age: </h3>
            {CONSTANTS.AGE_OPTIONS.map((age) => (
              <div className="ProductsPage__sort_field" key={age}>
                <Checkbox value={age} selected={ageValue} text={age} onChange={setAgeValue} />
              </div>
            ))}
          </div>
        </div>
        <div className="ProductsPage__products-wrapper">
          {!loading && !isLoading && debouncedSearchText && (
            <h2 className="ProductsPage__products-title">{generateTitleSearch(debouncedSearchText, products)}</h2>
          )}
          <div className="ProductsPage__products">
            {loading || isLoading ? (
              <Spinner />
            ) : (
              products.map((obj: IProducts) => <GameCard key={obj.name} obj={obj} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
