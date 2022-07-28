import React from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import Product from "./Product";
import Error from "../helpers/error/Error";
import Loading from "../helpers/loading/Loading";
import Filters from "../filters/Filters";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { products, isLoading, isError, error, isSuccess } = useSelector(
    (state) => state.products
  );

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (isSuccess) {
    content = products?.map((product) => {
      return <Product key={product.id} product={product} />;
    });
  }

  if (isError) {
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
