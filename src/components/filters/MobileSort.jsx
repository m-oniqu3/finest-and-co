import React, { useEffect, useState } from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import Button from "../helpers/ui/button/Button";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { name: "Name: A-Z", value: "ascending" },
  { name: "Name: Z-A", value: "descending" },
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];

const MobileSort = (props) => {
  const handleClose = () => {
    props.setOpenSortMenu((state) => !state);
    //go to previous position after closing
    // window.history.back();
  };
  const [selectedSort, setSelectedSort] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  //   useEffect(() => {
  //     setSearchParams({ sort: selectedSort });
  //   }, [setSearchParams, selectedSort]);

  //clear the sort paramter, and the url then close the menu
  //   const handleClear = () => {
  //     setSelectedSort(null);
  //     setSearchParams({});
  //     props.setOpenSortMenu(false);
  //   };

  const options = sortOptions.map((item, index) => {
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
            <Button className="secondary">Clear</Button>
            <Button className="primary">Sort</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MobileSort;
