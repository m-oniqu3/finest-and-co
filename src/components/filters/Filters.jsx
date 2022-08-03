import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { MdFilterListAlt } from "react-icons/md";
import MobileFilter from "./MobileFilter";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  updateFilters,
} from "../../store/features/products/productsSlice";

const Filters = () => {
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem("filters"));

    if (!!filters) {
      dispatch(updateFilters(filters));
      if (!!products) dispatch(filterProducts(filters));
    }
  }, [dispatch, products]);

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
        {/* <h2>Shop</h2> */}
        <div className={styled.filters__btn}>
          <Search />

          <Button className="secondary" onClick={handleFilterMenu}>
            Filter & Sort
            <span>
              <MdFilterListAlt size="20" />
            </span>
          </Button>
        </div>
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
