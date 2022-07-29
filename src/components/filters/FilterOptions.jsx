import React, { useState } from "react";
import styled from "./FilterOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../helpers/ui/button/Button";
import { filterProducts } from "../../store/features/products/productsSlice";
import CategoryOptions from "./CategoryOptions";

const FilterOptions = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedCompany, setCheckedCompany] = useState([]);

  const handleCompany = (e) => {
    //destructure the value and the checked status of the checkbox from the event object
    const { value, checked } = e.target;

    //if the checkbox is checked, add the value to the checkedCompany array
    //if the checkbox is unchecked, remove the value

    if (checked) {
      setCheckedCompany((previous) => [...previous, value]);
    } else {
      setCheckedCompany(checkedCompany.filter((company) => company !== value));
    }
  };

  const handleClear = () => {
    setCheckedCategory([]);
    setCheckedCompany([]);
    props.setOpenFilterMenu(false);
    dispatch(
      filterProducts({ category: checkedCategory, company: checkedCompany })
    );
  };

  const handleFilter = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(
      filterProducts({
        category: checkedCategory,
        company: checkedCompany,
      })
    );
  };

  //get catgories and companies from the products array and create an array of unique values

  const productCompanies = new Set(products.map((product) => product.company));

  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.filter__option}>
        <input
          type="checkbox"
          id={company}
          value={company}
          onChange={handleCompany}
        />
        <label htmlFor={company}>{company}</label>
      </div>
    );
  });

  return (
    <form className={styled.filter} onSubmit={handleFilter}>
      <div className={styled.filter__group}>
        <CategoryOptions
          checkedCategory={checkedCategory}
          setCheckedCategory={setCheckedCategory}
        />
      </div>

      <div className={styled.filter__group}>
        <h4>Company</h4>
        {companyOptions}
      </div>

      <div className={styled["filter__button-group"]}>
        <Button className="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit" className="primary">
          Filter
        </Button>
      </div>
    </form>
  );
};

export default FilterOptions;
