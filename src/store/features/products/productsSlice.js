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
  },
});

export const { updateProducts, setError, setLoading } = productsSlice.actions;
export default productsSlice.reducer;
