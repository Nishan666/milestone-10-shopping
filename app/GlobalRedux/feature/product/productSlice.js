'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsFromAPI } from '../../../../services/products';
import { fetchCategoriesFromAPI } from "@/services/category";

const initialState = { 
    products: [],
    categories: [],
    status: 'idle',
    error: null,
    filters: {
        category: '',
        title: '',
        priceRange: { min: 0, max: 3000 },
    },
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({ offset, filters }) => {
    return fetchProductsFromAPI(offset, filters);
});

export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
    return fetchCategoriesFromAPI();
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
        state.filters.category = action.payload;
    },
    setTitleFilter: (state, action) => {
        state.filters.title = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
        state.filters.priceRange = action.payload;
    },
    resetProducts: (state) => {
        state.products = [];
        state.status = 'idle';
    }
  },
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
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategoryFilter, setTitleFilter, setPriceRangeFilter, resetProducts  } = productSlice.actions;

export const productReducer = productSlice.reducer;
