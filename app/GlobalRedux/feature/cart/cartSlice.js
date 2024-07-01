"use client";

import { createSlice } from "@reduxjs/toolkit";


// using loacalStorage

// const loadState = () => {
//   if (typeof window === "undefined") return { products: [] };
//   try {
//     const serializedState = localStorage.getItem("cart");
//     if (serializedState === null) {
//       return { products: [] };
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.error("Could not load state", e);
//     return { products: [] };
//   }
// };

// const saveState = (state) => {
//   if (typeof window === "undefined") return;
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("cart", serializedState);
//   } catch (e) {
//     console.error("Could not save state", e);
//   }
// };

// const initialState = loadState();

const initialState = {
  products: [],
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ id, quantity });
      }
      // saveState(state);
    },
    removeItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.quantity -= quantity;
        if (existingProduct.quantity <= 0) {
          state.products = state.products.filter(
            (product) => product.id !== id
          );
        }
      }
      // saveState(state);
    },
    removeEntireItem: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      // saveState(state);
    },
    resetCart: (state) => {
      state.products = [];
      // saveState(state);
    },
  },
});

export const { addItem, removeItem, resetCart, removeEntireItem } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
