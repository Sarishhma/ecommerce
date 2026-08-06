import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  mobileMenuOpen: boolean
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { mobileMenuOpen: false } as UIState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload
    },
  },
})

export const { toggleMobileMenu, setMobileMenuOpen } = uiSlice.actions
export const selectMobileMenuOpen = (state:{ui:UIState}) => state.ui.mobileMenuOpen

export default uiSlice.reducer