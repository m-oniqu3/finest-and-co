import React, { useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";
import MobileSort from "./MobileSort";

const Filters = () => {
  const [openSortMenu, setOpenSortMenu] = useState(false);

  const handleSortMenu = () => setOpenSortMenu((state) => !state);
  console.log(openSortMenu);

  return (
    <>
      <div className={styled.filters}>
        <Button className="secondary" onClick={handleSortMenu}>
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

      {openSortMenu && (
        <MobileSort
          openSortMenu={openSortMenu}
          setOpenSortMenu={setOpenSortMenu}
        />
      )}
    </>
  );
};

export default Filters;
