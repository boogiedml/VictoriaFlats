import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  selectedProduct: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cartItems.find(
        (item) => item.product.id === productId
      );
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product.id === productId
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];

        if (item.quantity === 1) {
          state.cartItems.splice(itemIndex, 1);
        } else if (item.quantity > 1) {
          item.quantity -= 1;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
