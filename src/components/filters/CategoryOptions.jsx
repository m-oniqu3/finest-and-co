import React, { useEffect, useState } from "react";
import styled from "./CategoryOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  updateFilters,
} from "../../store/features/products/productsSlice";

const CategoryOptions = () => {
  const { products, filters } = useSelector((state) => state.products);
  const storedCategory = JSON.parse(localStorage.getItem("category"));
  const [checkedCategory, setCheckedCategory] = useState(storedCategory || []);
  const dispatch = useDispatch();

  //array of unique categories
  const productCategories = new Set(products.map(({ category }) => category));

  //check the category, update the array
  const handleCategory = (e) => {
    let { value, checked } = e.target;

    if (checked) {
      setCheckedCategory((previous) => [...previous, value]);
      //update local storage
    } else {
      setCheckedCategory(
        checkedCategory?.filter((category) => category !== value)
      );
    }
  };

  //update local storage
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(checkedCategory));
    dispatch(updateFilters({ type: "category", value: checkedCategory }));
    dispatch(filterProducts());
  }, [checkedCategory, dispatch]);

  const categoryOptions = Array.from(productCategories).map((category) => {
    return (
      <div key={category} className={styled.category__option}>
        <input
          type="checkbox"
          id={category}
          value={category}
          onChange={handleCategory}
          checked={checkedCategory.includes(category)}
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
