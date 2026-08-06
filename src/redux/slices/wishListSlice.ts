import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WishlistState {
  ids: number[]
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: [] } as WishlistState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<number>) {
      const idx = state.ids.indexOf(action.payload)
      if (idx >= 0) state.ids.splice(idx, 1)
      else state.ids.push(action.payload)
    },
  },
})

export const { toggleWishlistItem } = wishlistSlice.actions

// Typed against the local slice shape, not the full store — avoids
// a circular import back to index.ts, which is where RootState lives.
export const selectWishlistIds = (state: { wishlist: WishlistState }) => state.wishlist.ids

export default wishlistSlice.reducer