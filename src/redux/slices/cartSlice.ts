import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const cartInitial: CartState = {
  items: [],
  isCartOpen: false,
};

export type AddToCartPayload = {
  productId?: string | number;
  id?: string | number;
  slug?: string;
  name?: string;
  title?: string;
  image?: string | null;
  price?: number;
  quantity?: number;
  maxQuantity?: number;
  variant?: {
    id: string;
    label: string;
  };
  compareAtPrice?: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitial,

  reducers: {
    addToCart(
      state,
      action: PayloadAction<AddToCartPayload>
    ) {
      const {
        quantity = 1,
        ...itemData
      } = action.payload;

      const rawId =
        itemData.productId ??
        itemData.id ??
        (itemData as any).product_id;

      if (rawId === undefined || rawId === null) {
        return;
      }

      const productId = String(rawId);

      const existingItem = state.items.find(
        (item) =>
          String(item.productId) === productId &&
          (item.variant?.id ?? null) ===
            (itemData.variant?.id ?? null)
      );

      const addQuantity =
        typeof quantity === "number" &&
        quantity > 0
          ? quantity
          : 1;

      const maxQuantity =
        typeof itemData.maxQuantity === "number" &&
        itemData.maxQuantity > 0
          ? itemData.maxQuantity
          : 99;

      // Existing product
      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + addQuantity,
          existingItem.maxQuantity
        );

        return;
      }

      // New product
      const newItem: CartItem = {
        id: crypto.randomUUID(),

        productId,

        slug: itemData.slug ?? "",

        name:
          itemData.name ??
          itemData.title ??
          "Product",

        image: itemData.image ?? "",

        price:
          typeof itemData.price === "number"
            ? itemData.price
            : 0,

        quantity: Math.min(
          addQuantity,
          maxQuantity
        ),

        maxQuantity,

        ...(itemData.variant
          ? {
              variant: itemData.variant,
            }
          : {}),

        ...(itemData.compareAtPrice !== undefined
          ? {
              compareAtPrice:
                itemData.compareAtPrice,
            }
          : {}),
      };

      state.items.push(newItem);
    },

    removeFromCart(
      state,
      action: PayloadAction<string>
    ) {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload &&
          String(item.productId) !==
            String(action.payload)
      );
    },

    updateQuantity(
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
      }>
    ) {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id ||
          String(item.productId) ===
            String(action.payload.id)
      );

      if (!item) {
        return;
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (item) =>
            item.id !== action.payload.id &&
            String(item.productId) !==
              String(action.payload.id)
        );

        return;
      }

      item.quantity = Math.min(
        action.payload.quantity,
        item.maxQuantity
      );
    },

    clearCart(state) {
      state.items = [];
    },

    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },

    setCartOpen(
      state,
      action: PayloadAction<boolean>
    ) {
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

export const selectCartItems = (
  state: { cart: CartState }
) => state.cart.items;

export const selectCartItemCount = (
  state: { cart: CartState }
) => state.cart.items.length;

export const selectCartTotalQuantity = (
  state: { cart: CartState }
) =>
  state.cart.items.reduce(
    (sum, item) =>
      sum +
      (typeof item.quantity === "number"
        ? item.quantity
        : 1),
    0
  );

export const selectCartTotal = (
  state: { cart: CartState }
) =>
  state.cart.items.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "number"
        ? item.price
        : 0) *
        (typeof item.quantity === "number"
          ? item.quantity
          : 1),
    0
  );

export const selectIsCartOpen = (
  state: { cart: CartState }
) => state.cart.isCartOpen;

export default cartSlice.reducer;