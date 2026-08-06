import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import  wishlistReducer from "./slices/wishListSlice"
import cartReducer from "./slices/cartSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    auth: authReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
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
  selectCartTotal,
  selectIsCartOpen,
} from "./slices/cartSlice"

export { toggleWishlistItem, selectWishlistIds } from "./slices/wishListSlice"

export { toggleMobileMenu, setMobileMenuOpen, selectMobileMenuOpen } from "./slices/uiSlice"

export type { CartItem, Cart } from "@/types/index"
