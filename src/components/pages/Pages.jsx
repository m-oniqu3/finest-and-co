import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import ProductInfo from "../products/ProductInfo";
import WishList from "./WishList";
import Cart from "./Cart";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import useGetCartFromFirebase from "../../hooks/useGetCartFromFirebase";
import {
  addToCart,
  updateCartFromFirebase,
} from "../../store/features/cart/cartSlice";

const Pages = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItemsForCurrentUser = useGetCartFromFirebase();
  const dispatch = useDispatch();

  //get cartdata from firebase
  useEffect(() => {
    // console.log(cartItemsForCurrentUser);
    if (user?.id && !!cartItemsForCurrentUser) {
      cartItemsForCurrentUser.forEach((item) => dispatch(addToCart(item)));
    }
  }, [cartItemsForCurrentUser, user, dispatch]);

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
