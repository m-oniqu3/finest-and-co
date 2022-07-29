import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  filteredProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      const data = action.payload;
      state.products = data.data;
    },
    setError: (state, action) => {
      const data = action.payload;
      state.error = data.error;
    },
    setLoading: (state, action) => {
      const data = action.payload;
      state.isLoading = data.isLoading;
    },
    filterProducts: (state, action) => {
      const filters = action.payload; //{category:[], company:[], sortBy:"" }

      const { category, company, sortBy } = filters;

      //copy the products array
      let temp = [...state.products];

      //filter by category
      if (category.length > 0) {
        temp = temp.filter((item) => {
          return category.includes(item.category);
        });
      }

      //filter by company
      if (company.length > 0) {
        temp = temp.filter((item) => {
          return company.includes(item.company);
        });
      }

      //sort by given field
      if (sortBy) {
        temp.sort((a, b) => {
          if (sortBy === "lowToHigh") {
            return a.price - b.price;
          } else if (sortBy === "highToLow") {
            return b.price - a.price;
          } else if (sortBy === "ascending") {
            return a.name.localeCompare(b.name);
          } else if (sortBy === "descending") {
            return b.name.localeCompare(a.name);
          }
          return temp;
        });
      }

      state.filteredProducts = temp;
    },
  },
});

export const { updateProducts, setError, setLoading, filterProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
