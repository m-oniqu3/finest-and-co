import React, { useEffect, useMemo, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  updateFilters,
  updateSearch,
} from "../../store/features/products/productsSlice";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSearchTerm = (e) => {
    // e.preventDefault();
    setSearchTerm(e.target.value);
  };

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
