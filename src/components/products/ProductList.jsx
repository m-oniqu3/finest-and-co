import React, { useEffect, useState } from "react";
import styled from "./ProductList.module.css";
import Container from "../helpers/wrapper/Container";
import Product from "./Product";
import Error from "../helpers/error/Error";
import Loading from "../helpers/loading/Loading";
import Filters from "../filters/Filters";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";

const ProductList = () => {
  const [showSidebar, setShowSidebar] = useState(false);
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

  //mount the sidebar at 768px
  // useEffect(() => {
  //   const makeVisible = () => {
  //     if (window.innerWidth > 768) setShowSidebar(true);
  //     else setShowSidebar(false);
  //   };

  //   window.addEventListener("resize", makeVisible);
  //   makeVisible();

  //   //cleanup
  //   return () => window.removeEventListener("resize", makeVisible);
  // }, []);

  return (
    <Container>
      <Filters />

      <div className={styled.product__grid}>
        <aside>
          <Sidebar />
        </aside>

        <section className={styled.product__list}>{content}</section>
      </div>
    </Container>
  );
};

export default ProductList;
