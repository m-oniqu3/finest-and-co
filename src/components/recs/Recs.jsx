import React from "react";
import Container from "../helpers/wrapper/Container";
import SimilarCategories from "./SimilarCategories";

const Recs = (props) => {
  const { product } = props;

  return (
    <>
      <Container>
        <SimilarCategories product={product} />
      </Container>
    </>
  );
};

export default Recs;
