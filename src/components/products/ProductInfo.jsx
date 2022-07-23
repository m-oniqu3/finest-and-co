import React from "react";
import { useGetProductInfoQuery } from "../../store/features/api/apiSlice";
import { useParams } from "react-router";
import ProductDetails from "./ProductDetails";
import Loading from "../helpers/loading/Loading";
import Error from "../helpers/error/Error";

const ProductInfo = () => {
  // Get the product id from the url
  const { productId } = useParams();
  const results = useGetProductInfoQuery(productId);

  let content;

  if (results.isSuccess) {
    content = <ProductDetails product={results.data} showDetails={true} />;
  }

  if (results.isLoading) {
    content = <Loading />;
  }

  if (results.isError) {
    content = <Error error={results.error} />;
  }

  return <section>{content} </section>;
};

export default ProductInfo;
