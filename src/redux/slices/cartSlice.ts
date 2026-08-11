import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem } from "@/types"

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
}

const cartInitial: CartState = { items: [], isCartOpen: false }

export type AddToCartPayload = {
  productId?: string | number
  id?: string | number
  slug?: string
  name?: string
  title?: string
  image?: string | null
  price?: number
  quantity?: number
  maxQuantity?: number
  variant?: { id: string; label: string }
  compareAtPrice?: number
}

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitial,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { quantity = 1, ...itemData } = action.payload

      const rawId = itemData.productId ?? itemData.id ?? (itemData as any).product_id
      if (rawId === undefined || rawId === null) return

      const targetProductId = String(rawId)

      const existingIndex = state.items.findIndex(
        (i) =>
          String(i.productId || i.id) === targetProductId &&
          (i.variant?.id ?? null) === (itemData.variant?.id ?? null)
      )

      const addQty = isNaN(quantity) || quantity <= 0 ? 1 : quantity
      const maxQty =
        typeof itemData.maxQuantity === "number" && !isNaN(itemData.maxQuantity) && itemData.maxQuantity > 0
          ? itemData.maxQuantity
          : 99

      if (existingIndex >= 0) {
        const existingItem = state.items[existingIndex]
        const currentQty = isNaN(existingItem.quantity) ? 1 : existingItem.quantity
        existingItem.quantity = Math.min(currentQty + addQty, existingItem.maxQuantity || maxQty)
      } else {
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          productId: targetProductId,
          slug: itemData.slug || "",
          name: itemData.name || itemData.title || "Product",
          image: itemData.image || "",
          price: typeof itemData.price === "number" && !isNaN(itemData.price) ? itemData.price : 0,
          quantity: Math.min(addQty, maxQty),
          maxQuantity: maxQty,
          ...(itemData.variant ? { variant: itemData.variant } : {}),
          ...(itemData.compareAtPrice ? { compareAtPrice: itemData.compareAtPrice } : {}),
        }
        state.items.push(newItem)
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload && String(i.productId) !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id || String(i.productId) === action.payload.id)
      if (!item) return

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== action.payload.id && String(i.productId) !== action.payload.id)
      } else {
        const maxQty = item.maxQuantity || 99
        item.quantity = Math.min(action.payload.quantity, maxQty)
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
// Number of unique items in cart for nav badge display
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.items.length
// Total quantity of all items in cart
export const selectCartTotalQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + (isNaN(i.quantity) ? 1 : i.quantity), 0)
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + (isNaN(i.price) ? 0 : i.price) * (isNaN(i.quantity) ? 1 : i.quantity), 0)
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isCartOpen

export default cartSlice.reducer