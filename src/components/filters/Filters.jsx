import React, { useEffect, useState } from "react";
import styled from "./Filters.module.css";
import Button from "../helpers/ui/button/Button";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../../store/features/products/productsSlice";
import MobileFilter from "./MobileFilter";
import Search from "../search/Search";
import useLocalStorage from "../../hooks/useLocalStorage";

const Filters = () => {
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const storedValues = useLocalStorage();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const isEmpty = Object.keys(storedValues).length === 0;
    if (!isEmpty && products.length > 0) {
      dispatch(filterProducts(storedValues));
    }
  }, [storedValues, dispatch, products]);

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

  const handleSearch = () => {
    //clear search term
    localStorage.setItem(
      "values",
      JSON.stringify({
        ...storedValues,
        search: "",
      })
    );
    dispatch(filterProducts({ ...storedValues, search: "" }));
  };

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

      {storedValues.length > 0 && (
        <p onClick={handleSearch}>{storedValues?.search}</p>
      )}
    </>
  );
};

export default Filters;
