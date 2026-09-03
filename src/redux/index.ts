import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import wishlistReducer from "./slices/wishListSlice"
import cartReducer from "./slices/cartSlice"
import type { CartItem } from "@/types/index"

// ── localStorage persistence helpers ────────────────────────────────────────
const CART_KEY = "cc_cart"
const WISHLIST_KEY = "cc_wishlist"

function loadFromStorage<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage quota exceeded — fail silently
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Rehydrate cart and wishlist from localStorage before store creation
const preloadedCart = loadFromStorage<{ items: CartItem[]; isCartOpen: boolean }>(CART_KEY)
const preloadedWishlist = loadFromStorage<{ ids: (number | string)[] }>(WISHLIST_KEY)

const preloadedState: Partial<RootState> = {}

if (preloadedCart) {
  preloadedState.cart = { ...preloadedCart, isCartOpen: false }
}
if (preloadedWishlist) {
  preloadedState.wishlist = preloadedWishlist
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

// Subscribe to store changes and persist cart + wishlist on every update
store.subscribe(() => {
  const state = store.getState()
  saveToStorage(CART_KEY, state.cart)
  saveToStorage(WISHLIST_KEY, state.wishlist)
})



export type AppDispatch = typeof store.dispatch

export { useAppDispatch, useAppSelector } from "./hooks"

export {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  selectCartItems,
  selectCartItemCount,
  selectCartTotalQuantity,
  selectCartTotal,
  selectIsCartOpen,
} from "./slices/cartSlice"

export { toggleWishlistItem, selectWishlistIds, selectWishlistCount } from "./slices/wishListSlice"

export { toggleMobileMenu, setMobileMenuOpen, selectMobileMenuOpen } from "./slices/uiSlice"

export type { CartItem, Cart } from "@/types/index"

