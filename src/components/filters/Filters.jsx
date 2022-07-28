import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";
import MobileSort from "./MobileSort";
import { useDispatch, useSelector } from "react-redux";
import { sortProducts } from "../../store/features/products/productsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [openSortMenu, setOpenSortMenu] = useState(false);
  const [option, setOption] = useState("ascending");

  /** check if there is a sort option in local storage
   *  if there is, set the option to that value */
  useEffect(() => {
    const storedOption = localStorage.getItem("sortOption");
    if (storedOption !== "") {
      setOption(storedOption);
    }
  }, []);

  //dispatch the action to sort the products based on option
  useEffect(() => {
    if (option) {
      dispatch(sortProducts(option));
    }
  }, [option, dispatch, products]);

  //set the sort menu to open or closed
  const handleSortMenu = () => setOpenSortMenu((state) => !state);

  //when the sort menu is open, prevent scrolling
  useEffect(() => {
    if (openSortMenu) {
      document.body.style.overflow = "hidden";
    } else if (!openSortMenu) {
      document.body.style.overflow = "auto";
    }
  }, [openSortMenu]);

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
          option={option}
          setOption={setOption}
        />
      )}
    </>
  );
};

export default Filters;
