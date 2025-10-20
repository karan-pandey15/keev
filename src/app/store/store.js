// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// optional: attach for debugging
if (typeof window !== "undefined") {
  window.__STORE__ = store;
}

export default store;
