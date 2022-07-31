import React, { useEffect, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterProducts,
} from "../../store/features/products/productsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  //update the search term
  const handleSearch = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    //get values from local store
    const checkedCategory = JSON.parse(localStorage.getItem("checkedCategory"));
    const checkedCompany = JSON.parse(localStorage.getItem("checkedCompany"));
    const option = JSON.parse(localStorage.getItem("option"));

    const exists = checkedCategory || checkedCompany || option;
    if (searchTerm !== "") {
      localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
      dispatch(
        filterProducts({
          category: checkedCategory,
          company: checkedCompany,
          sortBy: option,

          search: searchTerm,
        })
      );
    } else if (searchTerm === "" && exists) {
      dispatch(
        filterProducts({
          category: checkedCategory,
          company: checkedCompany,
          sortBy: option,
        })
      );
    }
    //clean up
    return () => {
      dispatch(clearFilters());
    };
  }, [searchTerm, dispatch]);

  return (
    <form className={styled.search}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search"
        onChange={handleSearch}
        value={searchTerm}
      />
      <label htmlFor="search">
        <BiSearch size="20" />
      </label>
    </form>
  );
};

export default Search;
