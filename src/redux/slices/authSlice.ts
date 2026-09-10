
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
      const u = action.payload.user
      if (u) {
        const normalizedId = u.id ?? (u as any).user_id ?? (u as any).pk
        state.user = { ...u, id: normalizedId }
      } else {
        state.user = null
      }
      state.isAuthenticated = true
      state.error = null
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      const u = action.payload
      if (u) {
        const existing = state.user || {}
        const normalizedId = u.id || (u as any).user_id || (u as any).pk || (existing as any).id
        state.user = { ...existing, ...u, id: normalizedId }
      } else {
        state.user = null
      }
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