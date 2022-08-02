import React, { useEffect } from "react";
import styled from "./CategoryOptions.module.css";
import { useSelector } from "react-redux";

const CategoryOptions = (props) => {
  const { setCheckedCategory, checkedCategory } = props;
  const { products, filters } = useSelector((state) => state.products);

  //array of unique categories
  const productCategories = new Set(products.map(({ category }) => category));

  //when the component mounts, set the checkedCategory to the filters.category
  useEffect(() => {
    const { category } = filters;
    if (category) setCheckedCategory(filters?.category);
  }, [setCheckedCategory, filters]);

  //check the category, update the array
  const handleCategory = (e) => {
    let { value, checked } = e.target;

    if (checked) setCheckedCategory((previous) => [...previous, value]);
    else
      setCheckedCategory(
        checkedCategory.filter((category) => category !== value)
      );
  };

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
