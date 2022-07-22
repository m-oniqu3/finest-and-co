import React from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import { useGetProductsQuery } from "../../store/features/api/apiSlice";
import Product from "./Product";
import Button from "../helpers/ui/button/Button";

const ProductList = () => {
  const results = useGetProductsQuery();

  let content;

  if (results.isLoading) {
    content = <p>Loading...</p>;
  }

  if (results.isSuccess) {
    content = results.data?.map((product) => {
      return <Product key={product.id} product={product} />;
    });
  }

  if (results.isError) {
    content = <p>{results.error}</p>;
  }

  return (
    <Container>
      <div className={styled.list__header}>
        <h3>Products</h3>
        <Button>Sort</Button>
      </div>
      <section className={styled.list}>{content}</section>
    </Container>
  );
};

export default ProductList;
