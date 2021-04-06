import React from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../SearchBar";
import { Select, Checkbox } from "../../../elements";
import "./ProductsPage.scss";

interface ParamTypes {
  param: string;
}

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();
  const criteriaOptions = ["age", "rating", "date"];
  const typeOptions = ["ascending", "descending"];

  return (
    <div className="ProductsPage">
      <div className="ProductsPage__header">
        <h3>{param}</h3>
        <SearchBar />
      </div>
      <div className="ProductsPage__wrapper">
        <div className="ProductsPage__sort-container">
          <div className="ProductsPage__sort">
            <h3>Sort:</h3>
            <div className="ProductsPage__sort_field">
              <h4>Criteria: </h4>
              <Select optionsList={criteriaOptions} />
            </div>
            <div className="ProductsPage__sort_field">
              <h4>Type: </h4>
              <Select optionsList={typeOptions} />
            </div>
            <h3>Genre: </h3>
            <Checkbox />
          </div>
        </div>
        <div className="ProductsPage__products" />
      </div>
    </div>
  );
};

export default ProductsPage;
