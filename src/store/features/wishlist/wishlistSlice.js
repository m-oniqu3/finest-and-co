import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: [],
  amountOfItemsInWishList: 0,
  itemIsInList: false,
  feedback: {
    image: "",
    message: "",
  },
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      //stores the payload in a constant
      const itemToAdd = action.payload;

      //checks if the payload is already in the  wishListItems array
      const itemToAddExists = state.wishListItems.find(
        (item) => item.id === itemToAdd.id
      );

      //if payload does not exist then create a new object with its values
      if (!itemToAddExists) {
        state.wishListItems.unshift(itemToAdd);

        //Update the feedback and increase the amount of items in the wishlist
        state.feedback.message = "Item added";
        state.feedback.image = itemToAdd.imgSrc;
        state.amountOfItemsInWishList++;
        // state.itemIsInList = state.wishListItems.includes(itemToAdd);
      }
      if (itemToAddExists) {
        //Update the feedback and increase the amount of items in the wishlist
        state.message = "Item removed";
        state.amountOfItemsInWishList--;
        // state.itemIsInList = state.wishListItems.includes(itemToAddExists);

        //remove the selected item from the array
        state.wishListItems = state.wishListItems.filter(
          (item) => item.id !== itemToAddExists.id
        );
      }
    },

    /**checks if the current item is already in the wishlist
     * returns boolean
     */
    checkIfItemIsInWishList: (state, action) => {
      //check if the id of the item is in the wishlist
      const id = action.payload;
      const item = state.wishListItems.find((item) => item.id === id);

      if (item) state.itemIsInList = true;
      else state.itemIsInList = false;
    },
  },
});

export const { addToWishList, checkIfItemIsInWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
