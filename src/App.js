import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addCartToFirebase } from "./components/firebase/firebase-config";
import Loading from "./components/helpers/loading/Loading";
import Pages from "./components/pages/Pages";
import useAuth from "./hooks/useAuth";

import { useGetProductsQuery } from "./store/features/api/apiSlice";

import {
  setError,
  updateProducts,
} from "./store/features/products/productsSlice";
import { setUser } from "./store/features/user/authSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //get data from the api
  const results = useGetProductsQuery();

  //update the products in the store
  useEffect(() => {
    const { data, error, isSuccess, isError } = results;

    if (isSuccess) dispatch(updateProducts({ data: data }));
    if (isError) dispatch(setError({ error: error }));
  }, [dispatch, results]);

  //set the user in the store
  useEffect(() => {
    if (currentUser) dispatch(setUser(currentUser));
  }, [currentUser, dispatch]);

  //add to firebase
  useEffect(() => {
    const { cartItems } = cart;
    if (user?.id && cartItems.length > 0)
      addCartToFirebase(user?.id, cartItems);
  }, [cart, user]);

  return <>{results.isLoading ? <Loading /> : <Pages />}</>;
}

export default App;
