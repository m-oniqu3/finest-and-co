import React from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import Button from "../helpers/ui/button/Button";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../store/features/products/productsSlice";
import { sortOptions } from "./sortOptions";

const MobileSort = (props) => {
  const dispatch = useDispatch();

  //close the menu
  const handleClose = () => props.setOpenSortMenu((state) => !state);

  //clear the sort option in local storage and set the option to the default
  const handleClear = () => {
    props.setOption("ascending");
    localStorage.removeItem("sortOption");
    props.setOpenSortMenu(false);
  };

  //set the option then store it in local storage
  const handleChange = (e) => {
    props.setOption(e.target.value);
    localStorage.setItem("sortOption", e.target.value);
  };

  //dispatch the action to sort the products based on option
  const handleSort = () => {
    if (props.option) {
      dispatch(sortProducts(props.option));
      props.setOpenSortMenu(false);
    }
  };

  //map over the sort options and input for each option
  const options = sortOptions.map((item, index) => {
    return (
      <div key={index} className={styled.item}>
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
