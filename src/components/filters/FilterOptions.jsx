import React, { useState } from "react";
import styled from "./FilterOptions.module.css";
import { useDispatch } from "react-redux";
import Button from "../helpers/ui/button/Button";
import { filterProducts } from "../../store/features/products/productsSlice";
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

    dispatch(
      filterProducts({
        category: checkedCategory,
        company: checkedCompany,
        sortBy: option,
      })
    );

    //remove values from local store
    localStorage.removeItem("checkedCategory");
    localStorage.removeItem("checkedCompany");
    localStorage.removeItem("option");

    props.setOpenFilterMenu(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    //dispatch the action to filter the products based on values
    dispatch(
      filterProducts({
        category: checkedCategory,
        company: checkedCompany,
        sortBy: option,
      })
    );

    //store values in local storage
    localStorage.setItem("checkedCategory", JSON.stringify(checkedCategory));
    localStorage.setItem("checkedCompany", JSON.stringify(checkedCompany));
    localStorage.setItem("option", JSON.stringify(option));

    //close the filter menu
    props.setOpenFilterMenu(false);
  };

  //get catgories and companies from the products array and create an array of unique values

  return (
    <form className={styled.filter} onSubmit={handleFilter}>
      <SortOptions option={option} setOption={setOption} />

      <div className={styled.filter__group}>
        <CategoryOptions
          checkedCategory={checkedCategory}
          setCheckedCategory={setCheckedCategory}
        />
      </div>

      <div className={styled.filter__group}>
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
