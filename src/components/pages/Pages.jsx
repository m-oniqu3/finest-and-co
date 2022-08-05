import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import ProductInfo from "../products/ProductInfo";
import WishList from "./WishList";
import Cart from "./Cart";
import Account from "./Account";
import { useSelector } from "react-redux";

const Pages = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductInfo />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/account"
          element={user?.id ? <Navigate to="/" /> : <Account />}
        />
      </Routes>
    </div>
  );
};

export default Pages;
