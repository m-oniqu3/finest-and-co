import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { BiSortAlt2 } from "react-icons/bi";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../store/features/products/productsSlice";
import MobileFilter from "./MobileFilter";

const Filters = () => {
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    //get the values from local storage
    const checkedCategory = JSON.parse(localStorage.getItem("checkedCategory"));
    const checkedCompany = JSON.parse(localStorage.getItem("checkedCompany"));
    const option = JSON.parse(localStorage.getItem("option"));

    //if there are values in local storage, dispatch the action to filter the products
    if (checkedCategory || checkedCompany || option) {
      if (products.length > 0) {
        dispatch(
          filterProducts({
            category: checkedCategory,
            company: checkedCompany,
            sortBy: option,
          })
        );
      }
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
