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

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const values = { ...storedValues, search: searchTerm };

    dispatch(filterProducts(values));
    dispatch(updateSearch(searchTerm));

    localStorage.setItem("values", JSON.stringify(values));
  }, [searchTerm, dispatch, storedValues]);

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
