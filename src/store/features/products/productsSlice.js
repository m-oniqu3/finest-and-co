import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  filters: {
    category: [],
    company: [],
    sortBy: "",
    search: "",
  },
  filteredProducts: [],
  filteredProductsMessage: "",
  currentSearch: "",
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
      const filters = state.filters; //{category:[], company:[], sortBy:"", search:""} }
      const { category, company, sortBy, search } = filters;

      // Check if there are any filters or search values
      const searchAndFilter =
        category?.length || company?.length || !!sortBy || !!search;

      // If no search or filter, clear filteredProductsMessage value
      if (!searchAndFilter) state.filteredProductsMessage = "";

      state.filteredProducts = [...state.products]
        // filter category or return full array
        .filter((item) => {
          if (category?.length) return category.includes(item.category);
          else return item;
        })
        // filter company or return full array
        .filter((item) => {
          if (company?.length) return company.includes(item.company);
          else return item;
        })
        .sort((a, b) => {
          if (sortBy === "lowToHigh") {
            return a.price - b.price;
          } else if (sortBy === "highToLow") {
            return b.price - a.price;
          } else if (sortBy === "ascending") {
            return a.name.localeCompare(b.name);
          } else if (sortBy === "descending") {
            return b.name.localeCompare(a.name);
          }
          return a - b;
        })
        // filter name
        .filter(({ name }) => {
          if (search) return name.toLowerCase().includes(search.toLowerCase());
          return (state.filteredProductsMessage = "No results found");
        });

      //if there are no products that match the filters, show a message
      if (!state.filteredProducts) {
        state.filteredProductsMessage = "No products found";
      }
    },
    clearFilters: (state, action) => {
      state.filteredProducts = [];
      state.filteredProductsMessage = "";
      state.filters = {
        category: [],
        company: [],
        sortBy: "",
        search: "",
      };
    },
    updateSearch: (state, action) => {
      state.currentSearch = action.payload;
    },
    updateFilters: (state, action) => {
      const filter = action.payload;

      state.filters[filter.type] = filter.value;
    },
  },
});

export const {
  updateProducts,
  setError,
  setLoading,
  filterProducts,
  clearFilters,
  updateSearch,
  updateFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
