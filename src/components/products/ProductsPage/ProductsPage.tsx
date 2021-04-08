import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../SearchBar";
import { Select, Checkbox, Spinner } from "../../../elements";
import "./ProductsPage.scss";

import { PAGE_ACTIONS } from "../../../redux/actions/creators";

import { URLS } from "../../../constants";

import { RootState, IProducts } from "../../../utils/interfaces";
import { useFetchData } from "../../../utils";

import GameCard from "../GameCard";

interface ParamTypes {
  param: string;
}

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState<boolean>(false);
  const criteriaOptions = ["age", "rating", "date"];
  const typeOptions = ["ascending", "descending"];
  const genreList = ["all", "shooter", "fighting", "racing", "strategy", "sport"];
  const ageList = ["all", "6", "12", "16", "18"];
  const products = useSelector((state: RootState) => state.page.products);

  const { data, loading } = useFetchData(`${URLS.SERVER_URL}${URLS.GET_PRODUCTS_URL}${param}`);

  useEffect(() => {
    dispatch(PAGE_ACTIONS.setProducts(data));
  }, [data]);

  return (
    <div className="ProductsPage">
      <div className="ProductsPage__header">
        <h1>{param}</h1>
        <SearchBar />
      </div>
      <div className="ProductsPage__wrapper">
        <div className="ProductsPage__sort-container">
          <div className="ProductsPage__sort">
            <h2>Sort:</h2>
            <div className="ProductsPage__sort_field">
              <h4>Criteria: </h4>
              <Select optionsList={criteriaOptions} />
            </div>
            <div className="ProductsPage__sort_field">
              <h4>Type: </h4>
              <Select optionsList={typeOptions} />
            </div>
            <h3>Genre: </h3>
            {genreList.map((genre) => (
              <div className="ProductsPage__sort_field" key={genre}>
                <Checkbox name={genre} checked={genre === "all" ? true : isChecked} />
                <label htmlFor={genre}>{genre}</label>
              </div>
            ))}
            <h3>Age: </h3>
            {ageList.map((age) => (
              <div className="ProductsPage__sort_field" key={age}>
                <Checkbox name={age} checked={age === "all" ? true : isChecked} />
                <label htmlFor={age}>{age}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="ProductsPage__products">
          {loading ? <Spinner /> : products.map((obj: IProducts) => <GameCard key={obj.name} obj={obj} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
