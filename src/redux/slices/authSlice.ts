import { authService } from '@/client/feature/auth/services/auth.service';
import type { AuthState, User } from '@/client/feature/auth/types/auth.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';


const initialState: AuthState = {
  user: null,
  isAuthenticated: authService.hasValidToken(),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User | null; accessToken: string; refreshToken: string }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      authService.setTokens(accessToken, refreshToken);
      state.user = user || null;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      authService.clearTokens();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// Quick fix alias for SignupPage and legacy components
export const setUser = setCredentials;
// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;