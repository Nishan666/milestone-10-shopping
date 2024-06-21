'use client';

import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  products: [] 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ id, quantity });
      }
    },
    removeItem: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.quantity -= quantity;
        if (existingProduct.quantity <= 0) {
          state.products = state.products.filter(product => product.id !== id);
        }
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { addItem, removeItem, resetCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
