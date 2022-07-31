import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../store/features/products/productsSlice";
import MobileFilter from "./MobileFilter";
import Search from "../search/Search";

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
      //wait till products are available
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
        <h2>Products</h2>
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
