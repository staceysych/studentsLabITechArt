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
  const [isDefault, setDefault] = useState<boolean>(true);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [genreName, setGenreName] = useState<string>("all");
  const [ageValue, setAgeValue] = useState<string>("all");
  const [isLoading, setLoading] = useState<boolean>(false);
  const products = useSelector((state: RootState) => state.page.products);

  const debouncedSearchText = useDebounce(searchText, CONSTANTS.DEBOUNCE_TIME);
  const { data, loading } = useFetchData(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${param}`);

  const resetSortFilters = () => {
    setSortCriteria("");
    setSortType("");
    setGenreName("all");
    setAgeValue("all");
    setDefault(true);
  };

  const convertDateToSec = (date) => new Date(date).getTime() / 1000;

  const sortProducts = (productsArr) => {
    const sortedArr = productsArr.sort((a, b) => {
      const isDescending = sortType === "desc" ? -1 : 1;
      switch (sortCriteria) {
        case "age":
          return (a.age - b.age) * isDescending;
        case "rating":
          return (a.rating - b.rating) * isDescending;
        case "date":
          return (convertDateToSec(a.date) - convertDateToSec(b.date)) * isDescending;
        default:
          return 0;
      }
    });

    return sortedArr;
  };

  useEffect(() => {
    (async () => {
      if (sortCriteria || sortType || genreName || ageValue) {
        if (sortCriteria || sortType) {
          setDefault(false);
        }
        let searchedProducts;
        if (debouncedSearchText) {
          searchedProducts = data.filter((product) =>
            product.name.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
          );
        }
        const sortedProducts = sortProducts(searchedProducts || data);
        const filteredProducts = filterProducts(sortedProducts);
        await dispatch(PAGE_ACTIONS.setProducts(filteredProducts));
        setLoading(false);
      }
    })();
  }, [sortCriteria, sortType, genreName, ageValue, debouncedSearchText]);

  const filterProducts = (productsArr) =>
    productsArr.filter((product) => {
      const genreFiltered = genreName === "all" ? true : product.genre.includes(genreName);
      const ageFiltered = ageValue === "all" ? true : +product.age >= +ageValue;

      return genreFiltered && ageFiltered;
    });

  useEffect(() => {
    dispatch(PAGE_ACTIONS.setProducts(data));
    resetSortFilters();
  }, [data]);

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
