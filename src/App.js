import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Loading from "./components/helpers/loading/Loading";
import Pages from "./components/pages/Pages";
import { useGetProductsQuery } from "./store/features/api/apiSlice";
import {
  setError,
  setLoading,
  updateProducts,
} from "./store/features/products/productsSlice";

function App() {
  const dispatch = useDispatch();
  //get data from the api
  const results = useGetProductsQuery();

  //update the products in the store
  useEffect(() => {
    if (results.isSuccess) {
      dispatch(updateProducts({ data: results.data }));
    }

    if (results.isError) {
      dispatch(setError({ error: results.error }));
    }

    if (results.isLoading) {
      dispatch(setLoading({ isLoading: results.isLoading }));
    }
  }, [dispatch, results]);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
