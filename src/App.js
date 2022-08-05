import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
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

  return <>{results.isLoading ? <Loading /> : <Pages />}</>;
}

export default App;
