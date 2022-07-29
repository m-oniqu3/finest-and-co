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

  console.log(checkedCategory);
  console.log(checkedCompany);
  console.log(option);

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
          Filter
        </Button>
      </div>
    </form>
  );
};

export default FilterOptions;
