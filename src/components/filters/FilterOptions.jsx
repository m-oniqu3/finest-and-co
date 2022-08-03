import React, { useState } from "react";
import styled from "./FilterOptions.module.css";
import { useDispatch } from "react-redux";
import Button from "../helpers/ui/button/Button";
import {
  clearFilters,
  filterProducts,
  updateFilters,
} from "../../store/features/products/productsSlice";
import CategoryOptions from "./CategoryOptions";
import CompanyOptions from "./CompanyOptions";
import SortOptions from "./SortOptions.jsx";
import { useSelector } from "react-redux";

const FilterOptions = (props) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedCompany, setCheckedCompany] = useState([]);
  const [option, setOption] = useState("");

  //clear all filters and remove from local storage
  const handleClear = () => {
    setCheckedCategory([]);
    setCheckedCompany([]);
    setOption("");

    dispatch(clearFilters());
    props.setOpenFilterMenu(false);
  };

  const allFilters = {
    category: checkedCategory,
    company: checkedCompany,
    sortBy: option,
  };

  //update the filters, filter the products
  const handleFilter = (e) => {
    e.preventDefault();

    dispatch(updateFilters(allFilters));
    localStorage.setItem(
      "filters",
      JSON.stringify({ ...filters, ...allFilters })
    );
    dispatch(filterProducts());

    props.setOpenFilterMenu(false);
  };

  return (
    <form className={styled.filter} onSubmit={handleFilter}>
      <h4>Sort</h4>
      <SortOptions option={option} setOption={setOption} />

      <div className={styled.filter__group}>
        <h4>Filter by</h4>
        <CategoryOptions
          checkedCategory={checkedCategory}
          setCheckedCategory={setCheckedCategory}
        />

        <CompanyOptions
          checkedCompany={checkedCompany}
          setCheckedCompany={setCheckedCompany}
        />
      </div>

      {props.showButtons && (
        <div className={styled["filter__button-group"]}>
          <Button className="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit" className="primary">
            Apply
          </Button>
        </div>
      )}
    </form>
  );
};

export default FilterOptions;
