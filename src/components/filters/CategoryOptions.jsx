import React, { useEffect } from "react";
import styled from "./CategoryOptions.module.css";
import { useSelector } from "react-redux";

const CategoryOptions = (props) => {
  const { setCheckedCategory, checkedCategory } = props;
  const { products } = useSelector((state) => state.products);

  const productCategories = new Set(
    products.map((product) => product.category)
  );

  //when the component mounts, get the values from local storage and set the state, and checkboxes
  useEffect(() => {
    const storedCategory = JSON.parse(localStorage.getItem("checkedCategory"));
    if (storedCategory) {
      setCheckedCategory(storedCategory);
      //set the checkbox to checked
      storedCategory.forEach((category) => {
        document.getElementById(category).checked = true;
      });
    }
  }, [setCheckedCategory]);

  const handleCategory = (e) => {
    //destructure the value and the checked status of the checkbox from the event object
    let { value, checked } = e.target;

    //if the checkbox is checked, add the value to the checkedCategory array
    //if the checkbox is unchecked, remove the value
    if (checked) {
      setCheckedCategory((previous) => [...previous, value]);
    } else {
      setCheckedCategory(
        checkedCategory.filter((category) => category !== value)
      );
    }
  };

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
      {categoryOptions}
    </div>
  );
};

export default CategoryOptions;
