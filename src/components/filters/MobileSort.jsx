import React, { useEffect } from "react";
import styled from "./MobileSort.module.css";
import ReactDOM from "react-dom";

const MobileSort = (props) => {
  useEffect(() => {
    if (props.openSortMenu) {
      document.body.style.overflow = "hidden";
    } else if (!props.openSortMenu) {
      document.body.style.overflow = "auto";
    }
  }, [props]);

  return ReactDOM.createPortal(
    <section className={styled.sort}>MobileSort</section>,
    document.querySelector("#filters")
  );
};

export default MobileSort;
