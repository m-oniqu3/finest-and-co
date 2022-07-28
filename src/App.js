import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useGetProductsQuery } from "./store/features/api/apiSlice";
import { updateProducts } from "./store/features/products/productsSlice";

function App() {
  const dispatch = useDispatch();
  //get data from the api
  const { data, isError, error, isLoading, isSuccess } = useGetProductsQuery();
  const [products, setProducts] = useState([]);

  /**
   * check if the data is in LS, if not, fetch it from the API
   * if the data is in LS, set the products to the data in LS
   * if there is no data in LS, set the products to the data from the API
   */
  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setProducts(JSON.parse(storedData));
    } else if (!storedData && data) {
      localStorage.setItem("products", JSON.stringify(data));
      setProducts(data);
    }
  }, [data]);

  //update the products in the store
  useEffect(() => {
    if (products.length > 0) {
      dispatch(
        updateProducts({ products, error, isError, isLoading, isSuccess })
      );
    }
  }, [products, error, isError, isLoading, isSuccess, dispatch]);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
