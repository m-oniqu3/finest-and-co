import React from "react";
import styled from "./MobileFilter.module.css";
import ReactDOM from "react-dom";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import FilterOptions from "./FilterOptions";

const MobileFilter = (props) => {
  const handleClose = () => props.setOpenFilterMenu((state) => !state);

  return ReactDOM.createPortal(
    <section className={styled.filter__container}>
      <Container>
        <div className={styled.filter}>
          <p className={styled.filter__heading}>
            Filter and Sort
            <span onClick={handleClose}>
              <VscClose size="20" />
            </span>
          </p>

          <FilterOptions setOpenFilterMenu={props.setOpenFilterMenu} />
        </div>
      </Container>
    </section>,
    document.querySelector("#filters")
  );
};

export default MobileFilter;
