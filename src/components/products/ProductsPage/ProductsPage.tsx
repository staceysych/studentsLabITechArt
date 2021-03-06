import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar";
import { Select, Checkbox, Spinner, Button } from "../../../elements";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

import { URLS, CONSTANTS } from "../../../constants";

import { RootState, IProducts } from "../../../utils/interfaces";
import { useFetchData, useDebounce, generateTitleSearch } from "../../../utils";
import { sortProducts, filterProducts } from "./utils";

import GameCard from "../GameCard";

import styles from "./ProductsPage.module.scss";

interface ParamTypes {
  param: string;
}

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [isDefault, setDefault] = useState<boolean>(true);
  const [sortCriteria, setSortCriteria] = useState<string>(CONSTANTS.EMPTY_STRING);
  const [sortType, setSortType] = useState<string>(CONSTANTS.EMPTY_STRING);
  const [searchText, setSearchText] = useState<string>(CONSTANTS.EMPTY_STRING);
  const [genreName, setGenreName] = useState<string>(CONSTANTS.ALL_PRODUCTS);
  const [ageValue, setAgeValue] = useState<string>(CONSTANTS.ALL_PRODUCTS);
  const products = useSelector((state: RootState) => state.page.products);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isLoading = useSelector((state: RootState) => state.page.isLoading);
  const allProducts = useSelector((state: RootState) => state.page.allProducts);
  const isAdmin = userInfo.login === CONSTANTS.ADMIN;

  const debouncedSearchText = useDebounce(searchText, CONSTANTS.DEBOUNCE_TIME);
  const { data, loading } = useFetchData(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${param}`);

  const resetSortFilters = () => {
    setSortCriteria(CONSTANTS.EMPTY_STRING);
    setSortType(CONSTANTS.EMPTY_STRING);
    setGenreName(CONSTANTS.ALL_PRODUCTS);
    setAgeValue(CONSTANTS.ALL_PRODUCTS);
    setDefault(true);
  };

  useEffect(() => {
    (async () => {
      if (sortCriteria || sortType || genreName || ageValue) {
        if (sortCriteria || sortType) {
          setDefault(false);
        }
        let searchedProducts;
        if (debouncedSearchText) {
          searchedProducts = allProducts.filter((product) =>
            product.name.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
          );
        }

        const sortedProducts = sortProducts(searchedProducts || allProducts, sortCriteria, sortType);
        const filteredProducts = filterProducts(sortedProducts, genreName, ageValue);
        await dispatch(PAGE_ACTIONS.setProducts(filteredProducts));
        dispatch(PAGE_ACTIONS.setLoading(false));
      }
    })();
  }, [sortCriteria, sortType, genreName, ageValue, debouncedSearchText, allProducts]);

  useEffect(() => {
    dispatch(PAGE_ACTIONS.setAllProducts(data));
    dispatch(PAGE_ACTIONS.setProducts(data));
    resetSortFilters();
  }, [data]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDefault(true);
      dispatch(PAGE_ACTIONS.setLoading(true));
      setSearchText(event.target.value);
    },
    [setDefault, setSearchText]
  );

  const handleAddGame = () => {
    dispatch(PAGE_ACTIONS.setCardAction(CONSTANTS.ADD_PRODUCT));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{param}</h1>
        <div className={styles.controls}>
          <SearchBar handleChange={handleChange} />
          {isAdmin && <Button text="Add game" className={styles.btn} onClick={handleAddGame} />}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sortContainer}>
          <div className={styles.sort}>
            <h2>Sort:</h2>
            <div className={styles.sortField}>
              <h4>Criteria: </h4>
              <Select optionsList={CONSTANTS.CRITERIA_OPTIONS} setSortState={setSortCriteria} isDefault={isDefault} />
            </div>
            <div className={styles.sortField}>
              <h4>Type: </h4>
              <Select optionsList={CONSTANTS.TYPE_OPTIONS} setSortState={setSortType} isDefault={isDefault} />
            </div>
            <h3>Genre: </h3>
            {CONSTANTS.GENRE_OPTIONS.map((genre) => (
              <div className={styles.sortField} key={genre}>
                <Checkbox value={genre} selected={genreName} text={genre} onChange={setGenreName} />
              </div>
            ))}
            <h3>Age: </h3>
            {CONSTANTS.AGE_OPTIONS.map((age) => (
              <div className={styles.sortField} key={age}>
                <Checkbox value={age} selected={ageValue} text={age} onChange={setAgeValue} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.productsContainer}>
          {!loading && !isLoading && debouncedSearchText && (
            <h2 className={styles.productsTitle}>{generateTitleSearch(debouncedSearchText, products)}</h2>
          )}
          <div className={styles.products}>
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
