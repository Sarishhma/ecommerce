
import { authService } from '@/auth/services/auth.service';
import type { AuthState, User } from '@/auth/types/auth.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User | null; accessToken: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearCredentials: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    hydrateAuth: (state) => {
      const isValid = authService.hasValidToken()
      const user = authService.getUser()
      state.user = isValid && user ? user : null
      state.isAuthenticated = isValid && !!user
    },
  },
})

export const { setCredentials, setUser, clearCredentials, hydrateAuth } = authSlice.actions

export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated

export default authSlice.reducer