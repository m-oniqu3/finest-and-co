import React, { useEffect, useState } from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import Button from "../helpers/ui/button/Button";

const sortOptions = [
  { name: "Name: A-Z", value: "ascending" },
  { name: "Name: Z-A", value: "descending" },
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];

const MobileSort = (props) => {
  const handleClose = () => {
    props.setOpenSortMenu((state) => !state);
  };
  const [option, setOption] = useState(null);

  // clear the sort paramter, and the url then close the menu
  const handleClear = () => {
    console.log("clearing sort");
    setOption(null);
    props.setOpenSortMenu(false);
  };

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  const options = sortOptions.map((item, index) => {
    return (
      <div key={index} className={styled.item}>
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

  return (
    <section className={styled.sort__container}>
      <Container>
        <div className={styled.sort}>
          <p className={styled.sort__heading}>
            Sort by:
            <span onClick={handleClose}>
              <VscClose size="28" />
            </span>
          </p>

          <form>{options}</form>

          <div className={styled["sort__button-group"]}>
            <Button className="secondary" onClick={() => handleClear()}>
              Clear
            </Button>
            <Button className="primary">Sort</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MobileSort;
