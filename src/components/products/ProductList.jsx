import React, { useEffect, useState } from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import Product from "./Product";
import Error from "../helpers/error/Error";
import Loading from "../helpers/loading/Loading";
import Filters from "../filters/Filters";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { products, filteredProducts, isLoading, error } = useSelector(
    (state) => state.products
  );

  //set the products to the filtered products if there are any
  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : products;

  let content;

  const empty = isLoading || productsToDisplay.length === 0;

  if (empty) {
    content = <Loading />;
  }

  if (products) {
    content = productsToDisplay?.map((product) => {
      return <Product key={product.id} product={product} />;
    });
  }

  if (error) {
    content = <Error error={error} />;
  }

  return (
    <Container>
      <Filters />
      <section className={styled.list}>{content}</section>
    </Container>
  );
};

export default ProductList;
