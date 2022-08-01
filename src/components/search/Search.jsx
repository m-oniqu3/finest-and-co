import React, { useEffect, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  filterProducts,
  updateSearch,
} from "../../store/features/products/productsSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const storedValues = useLocalStorage();

  //update the search term
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const values = { ...storedValues, search: searchTerm };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterProducts(values));
    dispatch(updateSearch(searchTerm));
    localStorage.setItem("values", JSON.stringify(values));

    //clear the search term
    setSearchTerm("");
  };

  return (
    <form className={styled.search} onSubmit={handleSubmit}>
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
