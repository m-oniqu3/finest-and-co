import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  updateFilters,
} from "../../store/features/products/productsSlice";

export const filterContext = createContext();

const FilterContextProvider = ({ children }) => {
  //get filters from local storage
  const storedFilters = JSON.parse(localStorage.getItem("filters"));
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  //set filters to initial state if there are no filters in local storage
  const [filter, setFilter] = useState({
    category: storedFilters?.category || [],
    company: storedFilters?.company || [],
    sortBy: storedFilters?.sortBy || "",
  });

  //anytime filter changes, update the store, and save to local storage, and update the filtered products

  //update local storage, filter the products
  useEffect(() => {
    if (products.length > 0) {
      dispatch(updateFilters({ type: "category", value: filter.category }));
      dispatch(updateFilters({ type: "company", value: filter.company }));
      dispatch(updateFilters({ type: "sortBy", value: filter.sortBy }));
      dispatch(filterProducts());
    }
  }, [dispatch, filter, products]);

  return (
    <filterContext.Provider value={{ filter, setFilter }}>
      {children}
    </filterContext.Provider>
  );
};

export default FilterContextProvider;
