import React from "react";
import styled from "./FilterOptions.module.css";
import { useSelector } from "react-redux";
import Button from "../helpers/ui/button/Button";

const FilterOptions = () => {
  const { products } = useSelector((state) => state.products);

  const productCategories = new Set(
    products.map((product) => product.category)
  );

  const productCompanies = new Set(products.map((product) => product.company));

  const categoryOptions = Array.from(productCategories).map((category) => {
    return (
      <div key={category} className={styled.filter__option}>
        <input type="checkbox" id={category} />
        <label htmlFor={category}>{category}</label>
      </div>
    );
  });

  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.filter__option}>
        <input type="checkbox" id={company} />
        <label htmlFor={company}>{company}</label>
      </div>
    );
  });

  return (
    <form className={styled.filter}>
      <div className={styled.filter__group}>
        <h4>Category</h4>
        {categoryOptions}
      </div>

      <div className={styled.filter__group}>
        <h4>Company</h4>
        {companyOptions}
      </div>

      <div className={styled["filter__button-group"]}>
        <Button className="secondary">Clear</Button>
        <Button className="primary">Filter</Button>
      </div>
    </form>
  );
};

export default FilterOptions;
