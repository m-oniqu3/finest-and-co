import React, { useEffect } from "react";
import { sortOptions } from "./sortOptions.js";

const SortOptions = (props) => {
  //set the option then store it in local storage
  const handleChange = (e) => {
    props.setOption(e.target.value);
  };

  /**check is the option is set in local storage
   * if it is, set the option to the value of the local storage
   */

  //map over the sort options and input for each option
  const options = sortOptions.map((item, index) => {
    return (
      <div key={index}>
        <input
          type="radio"
          name="sort"
          id={index}
          value={item.value}
          checked={item.value === props.option}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    );
  });

  return (
    <div>
      <h4>Sort by</h4>
      {options}
    </div>
  );
};

export default SortOptions;
