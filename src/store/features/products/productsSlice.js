import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
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

      if (option === "ascending") {
        state.products.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (option === "descending") {
        state.products.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (option === "lowToHigh") {
        state.products.sort((a, b) => a.price - b.price);
      }

      if (option === "highToLow") {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
});

export const { updateProducts, setError, setLoading, sortProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
