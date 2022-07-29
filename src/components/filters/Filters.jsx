import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sortProducts } from "../../store/features/products/productsSlice";
import MobileFilter from "./MobileFilter";

const Filters = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
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

  //when the sort/filter menu is open, prevent scrolling
  useEffect(() => {
    if (openFilterMenu) {
      document.body.style.overflow = "hidden";
    } else if (!openFilterMenu) {
      document.body.style.overflow = "auto";
    }
  }, [openFilterMenu]);

  //set the  menu to open or closed
  const handleFilterMenu = () => setOpenFilterMenu((state) => !state);

  return (
    <>
      <div className={styled.filters}>
        <Button className="secondary">
          Sort
          <span>
            <BiSortAlt2 size="20" />
          </span>
        </Button>
        <Button className="secondary" onClick={handleFilterMenu}>
          Filter
          <span>
            <MdFilterListAlt size="20" />
          </span>
        </Button>
      </div>

      {openFilterMenu && (
        <MobileFilter
          openFilterMenu={openFilterMenu}
          setOpenFilterMenu={setOpenFilterMenu}
        />
      )}
    </>
  );
};

export default Filters;
