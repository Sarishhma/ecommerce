import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WishlistState {
  ids: (number | string)[]
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: [] } as WishlistState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<number | string>) {
      const targetIdStr = String(action.payload)
      const idx = state.ids.findIndex((id) => String(id) === targetIdStr)
      if (idx >= 0) {
        state.ids.splice(idx, 1)
      } else {
        const num = Number(action.payload)
        state.ids.push(isNaN(num) ? action.payload : num)
      }
    },
  },
})

export const { toggleWishlistItem } = wishlistSlice.actions

export const selectWishlistIds = (state: { wishlist: WishlistState }) => state.wishlist.ids
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.ids.length

export default wishlistSlice.reducer