import React from "react";
import Navbar from "../navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import ProductInfo from "../products/ProductInfo";

const Pages = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductInfo />} />
      </Routes>
    </div>
  );
};

export default Pages;
