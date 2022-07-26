import React from "react";
import Arrivals from "../arrival/Arrivals";
import Navbar from "../navbar/Navbar";
import ProductList from "../products/ProductList";

const Shop = () => {
  return (
    <>
      <Navbar />
      <Arrivals />
      <ProductList />
    </>
  );
};

export default Shop;
