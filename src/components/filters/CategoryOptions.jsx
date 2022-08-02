import React, { useEffect, useState } from "react";
import styled from "./CategoryOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../store/features/products/productsSlice";

const CategoryOptions = (props) => {
  const { setCheckedCategory, checkedCategory } = props;
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const productCategories = new Set(
    products.map((product) => product.category)
  );

  const handleCategory = (e) => {
    let { value, checked } = e.target;

    if (checked) setCheckedCategory((previous) => [...previous, value]);
    else
      setCheckedCategory(
        checkedCategory.filter((category) => category !== value)
      );
  };

  //update the filters with the checked categories
  useEffect(() => {
    const data = { type: "category", value: checkedCategory };
    if (checkedCategory) dispatch(updateFilters(data));
  }, [dispatch, checkedCategory]);

  const categoryOptions = Array.from(productCategories).map((category) => {
    return (
      <div key={category} className={styled.category__option}>
        <input
          type="checkbox"
          id={category}
          value={category}
          onChange={handleCategory}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    );
  });

  return (
    <div className={styled.category}>
      <h4>Category</h4>
      <div className={styled.categories}>{categoryOptions}</div>
    </div>
  );
};

export default CategoryOptions;
