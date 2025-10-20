// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, fallback) => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      console.warn(`Could not load ${key} from localStorage`, e);
      return fallback;
    }
  }
  return fallback;
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not save ${key} to localStorage`, e);
  }
};

const initialState = {
  // array of { id, name, description, image, points, quantity, category }
  items: [],
  // array of { id, name, description, image, points, category }
  favorites: [],
  isHydrated: false,
};

const persistState = (state) => {
  saveToLocalStorage("cart", state.items);
  saveToLocalStorage("favorites", state.favorites);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state) => {
      if (!state.isHydrated) {
        state.items = loadFromLocalStorage("cart", []);
        state.favorites = loadFromLocalStorage("favorites", []);
        state.isHydrated = true;
      }
    },
    addToCart: (state, action) => {
      const payload = action.payload; // expected { id, name, description, image, points, quantity, category }
      const existing = state.items.find((it) => it.id === payload.id);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (payload.quantity || 1);
      } else {
        state.items.push({
          id: payload.id,
          name: payload.name,
          description: payload.description,
          image: payload.image,
          points: payload.points,
          category: payload.category,
          quantity: payload.quantity || 1,
        });
      }
      // If product is in favorites list, keep the latest metadata from payload
      state.favorites = state.favorites.map((fav) =>
        fav.id === payload.id
          ? {
              id: payload.id,
              name: payload.name,
              description: payload.description,
              image: payload.image,
              points: payload.points,
              category: payload.category,
            }
          : fav
      );

      persistState(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        persistState(state);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      persistState(state);
    },
    clearCart: (state) => {
      state.items = [];
      persistState(state);
    },
    setCart: (state, action) => {
      state.items = action.payload;
      persistState(state);
    },
    toggleFavorite: (state, action) => {
      const product = action.payload; // expected { id, name, description, image, points, category }
      const exists = state.favorites.find((fav) => fav.id === product.id);

      if (exists) {
        state.favorites = state.favorites.filter((fav) => fav.id !== product.id);
      } else {
        state.favorites.push({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          points: product.points,
          category: product.category,
        });
      }
      persistState(state);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      persistState(state);
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCart,
  toggleFavorite,
  setFavorites,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectFavorites = (state) => state.cart.favorites;
export const selectFavoriteIds = (state) => state.cart.favorites.map((fav) => fav.id);
export const selectDistinctCount = (state) => state.cart.items.length;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((s, i) => s + (i.quantity || 0), 0);
export const selectTotalPoints = (state) =>
  state.cart.items.reduce((s, i) => s + (i.points * (i.quantity || 0)), 0);
export const selectIsFavorite = (state, id) => state.cart.favorites.some((fav) => fav.id === id);

export default cartSlice.reducer;
