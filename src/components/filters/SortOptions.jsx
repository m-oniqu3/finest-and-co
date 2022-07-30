import React, { useEffect } from "react";
import styled from "./SortOptions.module.css";
import { sortOptions } from "./sortOptions.js";

const SortOptions = (props) => {
  const { setOption, option } = props;

  const handleChange = (e) => setOption(e.target.value);

  /**check is the option is set in local storage
   * if it is, set the option to the value of the local storage
   */
  useEffect(() => {
    const storedOption = JSON.parse(localStorage.getItem("option"));
    if (storedOption) {
      setOption(storedOption);
    }
  }, [setOption]);

  //map over the sort options and input for each option
  const options = sortOptions.map((item, index) => {
    return (
      <div key={index} className={styled.sort__option}>
        <input
          type="radio"
          name="sort"
          id={index}
          value={item.value}
          checked={item.value === option}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    );
  });

  return <div className={styled.sort}>{options}</div>;
};

export default SortOptions;
