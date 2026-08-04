import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import authReducer, { hydrateAuth } from "./slices/authSlice";

/* ─────────────────────── Cart Types ─────────────────────── */

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

/* ─────────────────────── Cart Slice ─────────────────────── */

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const cartInitial: CartState = { items: [], isCartOpen: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitial,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity ?? 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

/* ─────────────────────── Wishlist Slice ─────────────────── */

interface WishlistState {
  ids: number[];
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: [] } as WishlistState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<number>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(action.payload);
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;

/* ─────────────────────── UI Slice ───────────────────────── */

interface UIState {
  mobileMenuOpen: boolean;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { mobileMenuOpen: false } as UIState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenuOpen } = uiSlice.actions;

/* ─────────────────────── Store ──────────────────────────── */

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    ui: uiSlice.reducer,
    auth: authReducer,
  },
});

// Hydrate auth on app load
store.dispatch(hydrateAuth() as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* ─────────────────────── Selectors ─────────────────────── */

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartItemCount = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectIsCartOpen = (s: RootState) => s.cart.isCartOpen;
export const selectWishlistIds = (s: RootState) => s.wishlist.ids;
