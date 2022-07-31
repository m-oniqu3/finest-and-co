import React from "react";
import styled from "./Search.module.css";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <form className={styled.search}>
      <input type="text" name="" id="" placeholder="Search" />
      <label htmlFor="search">
        <BiSearch size="20" />
      </label>
    </form>
  );
};

export default Search;
