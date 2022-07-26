import React from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";

const Filters = () => {
  return (
    <div className={styled.filters}>
      <Button className="secondary">
        Sort
        <span>
          <BiSortAlt2 size="20" />
        </span>
      </Button>
      <Button className="secondary">
        Filter
        <span>
          <MdFilterListAlt size="20" />
        </span>
      </Button>
    </div>
  );
};

export default Filters;
