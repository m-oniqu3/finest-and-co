import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
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

    if (results.isLoading || results.isFetching) {
      dispatch(setLoading({ isLoading: true }));
    }
  }, [dispatch, results]);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
