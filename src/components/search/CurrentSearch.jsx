import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector, useDispatch } from "react-redux";
import Button from "../helpers/ui/button/Button";
import {
  clearFilters,
  filterProducts,
  updateSearch,
} from "../../store/features/products/productsSlice";

const CurrentSearch = () => {
  const storedValues = useLocalStorage();
  const dispatch = useDispatch();
  const { currentSearch } = useSelector((state) => state.products);

  const clearSearch = () => {
    localStorage.setItem(
      "values",
      JSON.stringify({ ...storedValues, search: "" })
    );
    dispatch(updateSearch(""));
    dispatch(filterProducts({ ...storedValues, search: "" }));
  };

  const clearAll = () => {
    localStorage.removeItem("values");
    dispatch(updateSearch(""));
    dispatch(clearFilters());
  };

  return (
    <div>
      <Button className="secondary" onClick={clearSearch}>
        {currentSearch}
      </Button>

      <Button className="secondary" onClick={clearSearch}>
        Clear Search
      </Button>
      <Button className="primary" onClick={clearAll}>
        Clear All Filters
      </Button>
    </div>
  );
};

export default CurrentSearch;
