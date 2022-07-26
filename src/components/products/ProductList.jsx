import React from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import { useGetProductsQuery } from "../../store/features/api/apiSlice";
import Product from "./Product";
import Error from "../helpers/error/Error";
import Loading from "../helpers/loading/Loading";
import Filters from "../filters/Filters";

const ProductList = () => {
  const results = useGetProductsQuery();

  let content;

  if (results.isLoading) {
    content = <Loading />;
  }

  if (results.isSuccess) {
    content = results.data?.map((product) => {
      return <Product key={product.id} product={product} />;
    });
  }

  if (results.isError) {
    content = <Error error={results.error} />;
  }

  return (
    <Container>
      <Filters />
      <section className={styled.list}>{content}</section>
    </Container>
  );
};

export default ProductList;
