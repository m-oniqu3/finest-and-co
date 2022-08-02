import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSimilarCategories } from "../../store/features/products/productsSlice";

const SimilarCategories = (props) => {
  const {
    product: { id, category },
  } = props;
  const dispatch = useDispatch();
  const { similarCategories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSimilarCategories({ category, id }));
  }, [dispatch, category, id]);

  return (
    <section>
      <h1>Similar Categories</h1>
    </section>
  );
};

export default SimilarCategories;
