import React, { useContext } from "react";
import styled from "./FilterOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../helpers/ui/button/Button";
import { clearFilters } from "../../store/features/products/productsSlice";
import { sortOptions } from "./sortOptions.js";
import { filterContext } from "../contexts/filterContext";

const FilterOptions = (props) => {
  const dispatch = useDispatch();
  const { setFilter, filter } = useContext(filterContext);
  const { products } = useSelector((state) => state.products);

  //clear all filters
  const handleClear = () => {
    setFilter({
      category: [],
      company: [],
      sortBy: "",
    });

    dispatch(clearFilters());
    if (props.setOpenFilterMenu) props.setOpenFilterMenu(false);
  };

  //SORT SECTION

  //set the sort order, and update local storage
  const handleSort = (e) => {
    const sortBy = e.target.value;
    setFilter({ ...filter, sortBy });
  };

  //map over the sort options and input for each option
  const options = sortOptions.map((item, index) => {
    return (
      <div key={index} className={styled.filter__option}>
        <input
          type="radio"
          name="sort"
          id={index}
          value={item.value}
          checked={item.value === filter.sortBy}
          onChange={(e) => handleSort(e)}
        />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    );
  });

  // CATEGORY SECTION

  //array of unique categories
  const productCategories = new Set(products.map(({ category }) => category));

  //check the category, update the array, save to local storage
  const handleCategory = (e) => {
    let { value, checked } = e.target;
    let newFilter = { ...filter };
    if (checked) {
      newFilter.category = [...newFilter.category, value];
    }
    if (!checked) {
      newFilter.category = newFilter.category.filter(
        (category) => category !== value
      );
    }
    setFilter(newFilter);

    localStorage.setItem("filters", JSON.stringify(newFilter));
  };

  //map over the categories and crete an input for each option
  const categoryOptions = Array.from(productCategories).map((category) => {
    return (
      <div key={category} className={styled.filter__option}>
        <input
          type="checkbox"
          id={category}
          value={category}
          onChange={handleCategory}
          checked={filter.category.includes(category)}
        />
        <label htmlFor={category}>{category}</label>
      </div>
    );
  });

  // COMPANY SECTION

  //create an array of unique companies
  const productCompanies = new Set(products.map(({ company }) => company));

  //check the company, update the array, save to local storage
  const handleCompany = (e) => {
    const { value, checked } = e.target;

    let newFilter = { ...filter };
    if (checked) {
      newFilter.company = [...newFilter.company, value];
    }
    if (!checked) {
      newFilter.company = newFilter.company.filter(
        (company) => company !== value
      );
    }
    setFilter(newFilter);

    localStorage.setItem("filters", JSON.stringify(newFilter));
  };

  //map over the companies and create an input for each option
  const companyOptions = Array.from(productCompanies).map((company) => {
    return (
      <div key={company} className={styled.filter__option}>
        <input
          type="checkbox"
          id={company}
          value={company}
          onChange={handleCompany}
          checked={filter.company.includes(company)}
        />
        <label htmlFor={company}>{company}</label>
      </div>
    );
  });

  return (
    <form className={styled.filter}>
      <h3>Filters</h3>
      <div className={styled.filter__group}>
        <h4>Sort By</h4>
        {options}
      </div>

      <div className={styled.filter__group}>
        <h4>category</h4>
        {categoryOptions}
      </div>

      <div className={styled.filter__group}>
        <h4>company</h4>
        {companyOptions}
      </div>

      <Button className="secondary" onClick={handleClear}>
        Clear Filters
      </Button>
    </form>
  );
};

export default FilterOptions;
