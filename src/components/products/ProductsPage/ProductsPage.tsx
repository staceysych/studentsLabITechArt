import React from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  param: string;
}

const ProductsPage: React.FC = () => {
  const { param } = useParams<ParamTypes>();

  return (
    <div>
      <h3>{param}</h3>
    </div>
  );
};

export default ProductsPage;
