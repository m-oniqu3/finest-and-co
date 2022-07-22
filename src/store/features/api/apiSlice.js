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
  }),
});

export const { useGetProductsQuery } = apiSlice;
