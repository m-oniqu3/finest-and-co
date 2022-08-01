import React, { useState } from "react";
import styled from "./FilterOptions.module.css";
import { useDispatch } from "react-redux";
import Button from "../helpers/ui/button/Button";
import {
  clearFilters,
  filterProducts,
} from "../../store/features/products/productsSlice";
import CategoryOptions from "./CategoryOptions";
import CompanyOptions from "./CompanyOptions";
import SortOptions from "./SortOptions.jsx";
import useLocalStorage from "../../hooks/useLocalStorage";

const FilterOptions = (props) => {
  const dispatch = useDispatch();
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedCompany, setCheckedCompany] = useState([]);
  const [option, setOption] = useState("");
  const storedValues = useLocalStorage();

  const values = {
    category: checkedCategory,
    company: checkedCompany,
    sortBy: option,
    search: storedValues?.search ?? "",
  };

  //clear all filters and remove from local storage

  const handleClear = () => {
    setCheckedCategory([]);
    setCheckedCompany([]);
    setOption("");

    dispatch(clearFilters());
    localStorage.removeItem("values");
    props.setOpenFilterMenu(false);
  };

  /**dispatch the action to filter the products based on values
   * set the values in local store
   * close the filter menu
   */
  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterProducts({ ...storedValues, ...values }));
    localStorage.setItem("values", JSON.stringify(values));
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

      <div className={styled["filter__button-group"]}>
        <Button className="secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button type="submit" className="primary">
          Apply
        </Button>
      </div>
    </form>
  );
};

export default FilterOptions;
