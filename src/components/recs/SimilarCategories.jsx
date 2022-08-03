import React from "react";
import styled from "./SimilarCategories.module.css";
import { useSelector } from "react-redux";
import Product from "../products/Product";
import Loading from "../helpers/loading/Loading";

const SimilarCategories = (props) => {
  const { similarCategories } = useSelector((state) => state.products);

  //return products with similar categories
  const categories = similarCategories?.map((product) => {
    return <Product key={product.id} product={product} />;
  });

  return (
    <section className={styled.similarCategories}>
      <h1>Customers also viewed</h1>
      {categories ? (
        <div className={styled.categories}>{categories}</div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default SimilarCategories;
