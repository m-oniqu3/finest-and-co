import React from "react";
import styled from "./ProductInfo.module.css";
import { useGetProductInfoQuery } from "../../store/features/api/apiSlice";
import { useParams } from "react-router";
import ProductDetails from "./ProductDetails";
import Loading from "../helpers/loading/Loading";
import Error from "../helpers/error/Error";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Container from "../helpers/wrapper/Container";
import Navbar from "../navbar/Navbar";

const ProductInfo = () => {
  // Get the product id from the url
  const { productId } = useParams();
  const results = useGetProductInfoQuery(productId);
  const navigate = useNavigate();

  //navigate to the previous page
  const handlePrevious = () => navigate(-1);

  let content;

  if (results.isSuccess) {
    content = <ProductDetails product={results.data} />;
  }

  if (results.isLoading) {
    content = <Loading />;
  }

  if (results.isError) {
    content = <Error error={results.error} />;
  }

  return (
    <>
      <Navbar />
      <section className={styled.info}>
        <Container>
          <span onClick={handlePrevious}>
            <IoIosArrowDropleftCircle size="25" /> Back to Shop
          </span>
        </Container>

        <>{content}</>
      </section>
    </>
  );
};

export default ProductInfo;
