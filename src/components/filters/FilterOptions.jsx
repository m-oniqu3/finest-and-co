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

const FilterOptions = (props) => {
  const dispatch = useDispatch();
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedCompany, setCheckedCompany] = useState([]);
  const [option, setOption] = useState("");

  const handleClear = () => {
    setCheckedCategory([]);
    setCheckedCompany([]);
    setOption("");

    //dispatch the action to clear the filters
    dispatch(clearFilters());

    //remove values from local store
    localStorage.removeItem("checkedCategory");
    localStorage.removeItem("checkedCompany");
    localStorage.removeItem("option");

    props.setOpenFilterMenu(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    //store values in local storage
    localStorage.setItem("checkedCategory", JSON.stringify(checkedCategory));
    localStorage.setItem("checkedCompany", JSON.stringify(checkedCompany));
    localStorage.setItem("option", JSON.stringify(option));
    localStorage.setItem("searchTerm", JSON.stringify(""));

    //dispatch the action to filter the products based on values
    dispatch(
      filterProducts({
        category: checkedCategory,
        company: checkedCompany,
        sortBy: option,
      })
    );

    //close the filter menu
    props.setOpenFilterMenu(false);
  };

  //get catgories and companies from the products array and create an array of unique values

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
