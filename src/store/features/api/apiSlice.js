import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://course-api.com",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/react-store-products",
    }),
    getProductInfo: builder.query({
      query: (productId) => `/react-store-single-product?id=${productId}`,
      refetchOnMountOrArgChange: 3600,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductInfoQuery } = apiSlice;
