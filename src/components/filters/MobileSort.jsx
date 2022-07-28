import React, { useState } from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import Button from "../helpers/ui/button/Button";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../store/features/products/productsSlice";

const sortOptions = [
  { name: "Name: A-Z", value: "ascending" },
  { name: "Name: Z-A", value: "descending" },
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];

const MobileSort = (props) => {
  const dispatch = useDispatch();
  //close the menu
  const handleClose = () => props.setOpenSortMenu((state) => !state);

  const [option, setOption] = useState(sortOptions[0].value);

  const handleClear = () => {
    setOption(null);
    props.setOpenSortMenu(false);
  };

  const handleChange = (e) => setOption(e.target.value);

  const handleSort = () => {
    if (option) {
      dispatch(sortProducts(option));
      props.setOpenSortMenu(false);
    }
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

  return ReactDOM.createPortal(
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
            <Button className="primary" onClick={handleSort}>
              Sort
            </Button>
          </div>
        </div>
      </Container>
    </section>,
    document.querySelector("#filters")
  );
};

export default MobileSort;
