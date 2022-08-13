import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amountOfItemsInCart: 0,
  total: {
    subTotal: 0,
    tax: 0,
    shipping: 0,
    finalTotal: 0,
  },
};

/** addToCart
 * stores the payload in a constant itemToAdd
 * checks if the itemToAdd exists in the cartItems array in the store
 * increases the amountOfItemsInCart by 1
 * if the itemToAdd does not exist then add its content to a new object then push it to cartItems array
 * if the item does exist then increase its quantity and total price
 */

/** increase
 * increases the amountOfItemsInCart by 1
 * finds the payload in the cartItems array and stores it in cartItem constant
 * increases the cartItem's quantity and its total
 */

/** decrease
 * decreases the amountOfItemsInCart by 1
 * finds the payload in the cartItems array and stores it in cartItem constant
 * decreases the cartItem's quantity and its total
 * if the quantity is less than 1, remove the item from the cart
 */

/** calculateTotal
 * calculates the overall total of the cart
 * loops through the cartItems and adds each item productTotal
 */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const itemToAddExists = state.cartItems.find(
        (item) => item.id === itemToAdd.id
      );
      state.amountOfItemsInCart++;

      if (!itemToAddExists) {
        state.cartItems.unshift({
          id: itemToAdd.id,
          name: itemToAdd.name,
          price: itemToAdd.price,
          quantity: 1,
          productTotal: itemToAdd.price,
          image: itemToAdd.image,
        });
      } else {
        itemToAddExists.quantity++;
        itemToAddExists.productTotal += itemToAddExists.price;
      }
    },

    increase: (state, action) => {
      state.amountOfItemsInCart++;
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      cartItem.quantity = cartItem.quantity + 1;
      cartItem.productTotal += cartItem.price;
    },

    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      state.amountOfItemsInCart--;
      if (cartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== cartItem.id
        );
      } else {
        cartItem.quantity--;
        cartItem.productTotal -= cartItem.price;
      }
    },

    calculateTotal: (state) => {
      let total = 0;
      let subTotal = 0;
      let shipping = 0;
      let tax = 0;
      state.cartItems.forEach((item) => {
        subTotal += item.productTotal;
        tax += item.productTotal * 0.1;
        shipping += item.productTotal * 0.05;
      });
      total = subTotal + tax + shipping;
      state.total = {
        subTotal,
        tax,
        shipping,
        finalTotal: total,
      };
    },

    updateCartFromFirebase: (state, action) => {
      state.cartItems = action.payload;
      //get the amount of items in the cart
      let temp = 0;
      state.cartItems.forEach((item) => {
        temp = temp + item.quantity;
      });
      state.amountOfItemsInCart = temp;
    },
    clearCartOnLogout: (state) => {
      state.cartItems = [];
      state.amountOfItemsInCart = 0;
      state.total = {
        subTotal: 0,
        tax: 0,
        shipping: 0,
        finalTotal: 0,
      };
    },
  },
});

export const {
  increase,
  addToCart,
  decrease,
  calculateTotal,
  updateCartFromFirebase,
  clearCartOnLogout,
} = cartSlice.actions;
export default cartSlice.reducer;
