import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import ProductInfo from "../products/ProductInfo";
import WishList from "./WishList";
import Cart from "./Cart";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { updateCartFromFirebase } from "../../store/features/cart/cartSlice";
import { updateListFromFirebase } from "../../store/features/wishlist/wishlistSlice";
import Loading from "../helpers/loading/Loading";
import {
  addCartToFirebase,
  userDataCollection,
} from "../firebase/firebase-config";
import { onSnapshot, query, where } from "firebase/firestore";

const Pages = () => {
  const { id } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishlist);
  const [loading, setLoading] = useState(true);
  const [dataForUser, setDataForUser] = useState([]);
  const dispatch = useDispatch();

  //add cart and wishlist data firebase
  useEffect(() => {
    if (id !== null && (cartItems.length !== 0 || wishListItems.length !== 0))
      addCartToFirebase(id, cartItems, wishListItems);
  }, [cartItems, wishListItems, id]);

  //get the userData from firebase
  useEffect(() => {
    // query to find data for the current user
    const request = query(userDataCollection, where("id", "==", `${id}`));

    // get document from firebase
    const unsub = onSnapshot(request, (snapshot) => {
      setDataForUser(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    // clean up, unsubscribe from listener
    return () => unsub();
  }, [id]);

  // update the store with data from firebase
  useEffect(() => {
    const valid = dataForUser?.length !== 0 && dataForUser !== undefined;
    if (id !== null && valid) {
      const { cart, wishlist } = dataForUser[0];

      // if cart/wishlist is not null then update the store
      if (cart?.length !== 0) dispatch(updateCartFromFirebase(cart));
      if (wishlist?.length !== 0) dispatch(updateListFromFirebase(wishlist));
    }
  }, [dataForUser, id, dispatch]);

  if (id && loading) return <Loading />;
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
          element={id ? <Navigate to="/" /> : <Account />}
        />
      </Routes>
    </div>
  );
};

export default Pages;
