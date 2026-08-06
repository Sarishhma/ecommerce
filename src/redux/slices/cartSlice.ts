import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "@/types"

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
}

const cartInitial: CartState = { items: [], isCartOpen: false }

type AddToCartPayload = Omit<CartItem, "id" | "quantity"> & { quantity?: number }

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitial,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { quantity = 1, ...itemData } = action.payload

      const existing = state.items.find(
        (i) => i.productId === itemData.productId && i.variant?.id === itemData.variant?.id
      )

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, existing.maxQuantity)
      } else {
        state.items.push({
          ...itemData,
          id: crypto.randomUUID(),
          quantity: Math.min(quantity, itemData.maxQuantity),
        })
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (!item) return

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload.id)
      } else {
        item.quantity = Math.min(action.payload.quantity, item.maxQuantity)
      }
    },
    clearCart(state) {
      state.items = []
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, setCartOpen } =
  cartSlice.actions

export const selectCartItems = (state: { cart: CartState }) => state.cart.items
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isCartOpen

export default cartSlice.reducer