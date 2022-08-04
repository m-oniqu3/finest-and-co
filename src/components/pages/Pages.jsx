import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import ProductInfo from "../products/ProductInfo";
import WishList from "./WishList";
import Cart from "./Cart";
import Account from "./Account";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductInfo />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
};

export default Pages;
