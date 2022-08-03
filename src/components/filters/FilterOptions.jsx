import React, { useEffect, useState } from "react";
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

  const [checkedCompany, setCheckedCompany] = useState([]);
  const [option, setOption] = useState("");

  // console.log(storedCategory);

  //clear all filters and remove from local storage
  const handleClear = () => {
    setCheckedCompany([]);
    setOption("");

    dispatch(clearFilters());
    if (props.setOpenFilterMenu) props.setOpenFilterMenu(false);
  };

  //update the filters, filter the products
  // useEffect(() => {
  //   const allFilters = {
  //     category: checkedCategory,
  //     company: checkedCompany,
  //     sortBy: option,
  //   };

  //   dispatch(updateFilters(allFilters));
  //   // localStorage.setItem("filters", JSON.stringify(allFilters));
  //   dispatch(filterProducts());
  // }, [dispatch, checkedCategory, checkedCompany, option]);

  return (
    <form className={styled.filter}>
      <h4>Sort</h4>
      <SortOptions option={option} setOption={setOption} />
      <div className={styled.filter__group}>
        <h4>Filter by</h4>
        <CategoryOptions />

        <CompanyOptions
          checkedCompany={checkedCompany}
          setCheckedCompany={setCheckedCompany}
        />
      </div>
      <div className={styled["filter__button-group"]}>
        <Button className="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default FilterOptions;
