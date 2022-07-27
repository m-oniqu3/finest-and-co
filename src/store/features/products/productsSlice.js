import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      const data = action.payload;
      state.products = data.products;
      state.isLoading = data.isLoading;
      state.error = data.error;
      state.isError = data.isError;
      state.isSuccess = data.isSuccess;
    },
  },
});

export const { updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
