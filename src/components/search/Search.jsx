import React, { useEffect, useState } from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../store/features/products/productsSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const storedValues = useLocalStorage();

  const handleSearchTerm = (e) => {
    // e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.log(storedValues);
    const values = { ...storedValues, search: searchTerm };
    console.log(values);

    if (values) {
      localStorage.setItem("values", JSON.stringify(values));
      dispatch(filterProducts(values));
    }
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
