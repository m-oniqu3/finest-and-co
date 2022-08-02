import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Loading from "./components/helpers/loading/Loading";
import Pages from "./components/pages/Pages";
import { useGetProductsQuery } from "./store/features/api/apiSlice";
import {
  setError,
  updateProducts,
} from "./store/features/products/productsSlice";

function App() {
  const dispatch = useDispatch();
  //get data from the api
  const results = useGetProductsQuery();

  //update the products in the store
  useEffect(() => {
    const { data, error, isSuccess, isError } = results;

    if (isSuccess) dispatch(updateProducts({ data: data }));
    if (isError) dispatch(setError({ error: error }));
  }, [dispatch, results]);

  return <>{results.isLoading ? <Loading /> : <Pages />}</>;
}

export default App;
