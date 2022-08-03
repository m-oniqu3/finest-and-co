import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSimilarCategories } from "../../store/features/products/productsSlice";
import Container from "../helpers/wrapper/Container";
import SimilarCategories from "./SimilarCategories";

const Recs = (props) => {
  const { product } = props;
  const { similarCategories } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //get similar categories
  useEffect(() => {
    const { id, category } = product;
    dispatch(getSimilarCategories({ category, id }));
  }, [dispatch, product]);

  return (
    <Container>
      {similarCategories?.length > 0 && <SimilarCategories product={product} />}
    </Container>
  );
};

export default Recs;
