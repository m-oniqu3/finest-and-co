import React, { useState } from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";

const sortByList = [
  { name: "Name: A-Z", value: "ascending" },
  { name: "Name: Z-A", value: "descending" },
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];
const MobileSort = (props) => {
  const handleClose = () => props.setOpenSortMenu((state) => !state);
  const [selectedSort, setSelectedSort] = useState(sortByList[0].value);
  console.log(selectedSort);

  const sortBy = sortByList.map((item, index) => {
    return (
      <div key={index} className={styled.item}>
        <input
          type="radio"
          name="sort"
          id={index}
          value={item.value}
          checked={item.value === selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        />
        <label htmlFor={item.name}>{item.name}</label>
      </div>
    );
  });

  return ReactDOM.createPortal(
    <section className={styled.sort}>
      <Container>
        <p className={styled.sort__heading}>
          Sort by:
          <span onClick={handleClose}>
            <VscClose size="28" />
          </span>
        </p>

        <form>{sortBy}</form>
      </Container>
    </section>,
    document.querySelector("#filters")
  );
};

export default MobileSort;
