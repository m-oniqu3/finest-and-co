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

  console.log(checkedCategory);
  const values = {
    category: checkedCategory,
    company: checkedCompany,
    sortBy: option,
    search: storedValues?.search ?? "",
  };

  console.log(storedValues);

  const handleClear = () => {
    setCheckedCategory([]);
    setCheckedCompany([]);
    setOption("");

    //dispatch the action to clear the filters
    dispatch(clearFilters());

    //remove values from local store
    localStorage.removeItem("values");

    props.setOpenFilterMenu(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    //dispatch the action to filter the products based on values
    dispatch(
      filterProducts({
        ...storedValues,
        ...values,
      })
    );

    //set values in local store as object
    localStorage.setItem("values", JSON.stringify(values));

    //close the filter menu
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
