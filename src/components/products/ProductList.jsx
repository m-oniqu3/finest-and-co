import React from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import Product from "./Product";
import Error from "../helpers/error/Error";
import Loading from "../helpers/loading/Loading";
import Filters from "../filters/Filters";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { products, filteredProducts, filteredProductsMessage, error } =
    useSelector((state) => state.products);

  //set the products to the filtered products if there are any
  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : products;

  let content;

  const empty = productsToDisplay.length === 0;

  if (empty) content = <Loading />;
  if (error) content = <Error error={error} />;

  if (productsToDisplay) {
    content = (
      <div className={styled.list}>
        {productsToDisplay?.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    );
  }

  //when to show filter message
  if (filteredProductsMessage && filteredProducts.length === 0) {
    content = (
      <div className={styled.empty}>
        <h2>{filteredProductsMessage}.</h2>
        <p className="text">Try changing the filters to see more products.</p>
      </div>
    );
  }

  return (
    <Container>
      <Filters />
      <section>{content}</section>
    </Container>
  );
};

export default ProductList;
