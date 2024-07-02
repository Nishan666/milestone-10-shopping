"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./feature/product/productSlice";
import { cartReducer } from "./feature/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1.0,
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: persistReducer(persistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"],
      },
    }),
});
