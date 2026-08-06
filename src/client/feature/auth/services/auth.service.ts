import api from '@/lib/api';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login/', credentials);
    return response.data;
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),

  // Validates presence AND expiry of JWT
hasValidToken: (): boolean => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return false;

    // Convert Base64Url to standard Base64 and handle UTF-8 characters
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp ? payload.exp > currentTime : true;
  } catch {
    return false;
  }
}
};