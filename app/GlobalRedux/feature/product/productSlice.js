'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsFromAPI } from '../../../../services/products';

const initialState = { 
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (offset) => {
    return fetchProductsFromAPI(offset);
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...state.products, ...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
