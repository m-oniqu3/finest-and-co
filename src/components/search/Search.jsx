import React, { useEffect, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterProducts,
} from "../../store/features/products/productsSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const storedValues = useLocalStorage();

  //update the search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    //store term in local storage
    localStorage.setItem(
      "values",
      JSON.stringify({ ...storedValues, search: searchTerm })
    );
    e.preventDefault();

    console.log(storedValues);
    if (searchTerm !== "") {
      dispatch(filterProducts({ ...storedValues, search: searchTerm }));
    }

    //clear the search term
    setSearchTerm("");
  };

  //   useEffect(() => {
  //     if (searchTerm) {
  //       dispatch(
  //         filterProducts({
  //           ...storedValues,
  //           search: searchTerm,
  //         })
  //       );
  //     } else if (searchTerm === "") {
  //       dispatch(filterProducts({ ...storedValues }));
  //     }
  //   }, [searchTerm, dispatch, storedValues]);

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
