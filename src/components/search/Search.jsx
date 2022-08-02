import React, { useEffect, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  filterProducts,
  updateFilters,
} from "../../store/features/products/productsSlice";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  //update search term
  const handleSearchTerm = (e) => setSearchTerm(e.target.value);

  //update the filters, filter the products
  useEffect(() => {
    dispatch(updateFilters({ type: "search", value: searchTerm }));
    dispatch(filterProducts());
  }, [searchTerm, dispatch]);

  return (
    <form className={styled.search}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search"
        onChange={handleSearchTerm}
        value={searchTerm}
      />
      <label htmlFor="search">
        <BiSearch size="20" />
      </label>
    </form>
  );
};

export default Search;
