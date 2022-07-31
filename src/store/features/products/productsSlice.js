import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  filteredProducts: [],
  filteredProductsMessage: "",
  filters: {
    category: [],
    company: [],
    sortBy: "",
    search: "",
  },
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
      const filters = action.payload; //{category:[], company:[], sortBy:"", search:""} }

      const { category, company, sortBy, search } = filters;

      //copy the products array
      let temp = [...state.products];

      //filter by category
      if (category?.length > 0) {
        temp = temp.filter((item) => {
          return category.includes(item.category);
        });
      }

      //filter by company
      if (company?.length > 0) {
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

      //filter by search
      if (search) {
        temp = temp.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        });
      }

      //if no filters are applied, return the original products array
      if (
        category?.length === 0 &&
        company?.length === 0 &&
        sortBy === "" &&
        search === ""
      ) {
        temp = [...state.products];
        state.filteredProductsMessage = "";
      }

      //if there are no products that match the filters, show a message
      if (temp.length === 0) {
        state.filteredProductsMessage = "No products found";
      }

      state.filteredProducts = temp;
    },
    clearFilters: (state, action) => {
      state.filteredProducts = [];
      state.filteredProductsMessage = "";
    },
    updateFilters: (state, action) => {
      const filters = action.payload; //{category:[], company:[], sortBy:"", search:""} }

      state.filters = filters;
    },
  },
});

export const {
  updateProducts,
  setError,
  setLoading,
  filterProducts,
  clearFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
