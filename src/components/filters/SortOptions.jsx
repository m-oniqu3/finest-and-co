import React, { useEffect } from "react";
import styled from "./SortOptions.module.css";
import { sortOptions } from "./sortOptions.js";
import { useSelector } from "react-redux";

const SortOptions = (props) => {
  const { setOption, option } = props;
  const { filters } = useSelector((state) => state.products);

  //update the option
  const handleChange = (e) => setOption(e.target.value);

  //when the component mounts, set the option to the filters.sortBy
  useEffect(() => {
    const { sortBy } = filters;
    if (sortBy) setOption(sortBy);
  }, [setOption, filters]);

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
