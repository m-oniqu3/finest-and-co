import { createSlice, current } from "@reduxjs/toolkit";

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
    sortProducts: (state, action) => {
      const option = action.payload;

      let temp = [...state.products];

      if (state.filteredProducts.length > 0) {
        temp = [...state.filteredProducts];
      } else {
        temp = [...state.products];
      }

      if (option === "ascending") {
        temp.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (option === "descending") {
        temp.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (option === "lowToHigh") {
        temp.sort((a, b) => a.price - b.price);
      }

      if (option === "highToLow") {
        temp.sort((a, b) => b.price - a.price);
      }

      if (state.filteredProducts) {
        state.filteredProducts = temp;
      } else {
        state.products = temp;
      }
    },
    filterProducts: (state, action) => {
      const filters = action.payload; //{category:[], company:[]}

      let temp = [...state.products];

      if (filters.category.length > 0) {
        temp = temp.filter((product) =>
          filters.category.includes(product.category)
        );
      }
      if (filters.company.length > 0) {
        temp = temp.filter((product) =>
          filters.company.includes(product.company)
        );
      }
      state.filteredProducts = temp;

      console.log(state.filteredProducts);
    },
  },
});

export const {
  updateProducts,
  setError,
  setLoading,
  sortProducts,
  filterProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
