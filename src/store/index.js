import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/productsSlice";
import authReducer from "./features/user/authSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
