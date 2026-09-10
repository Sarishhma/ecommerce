import { jwtDecode } from 'jwt-decode'
import { publicApi } from '@/lib/api'
import type { LoginCredentials, LoginResponse, User } from '../types/auth.types'

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const

interface JwtPayload {
  exp?: number
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await publicApi.post<LoginResponse>('/login/', credentials)
    return data
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  },

  clearTokens: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  getAccessToken: (): string | null => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  setUser: (user: User) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    let decodedId: number | undefined
    if (token) {
      try {
        const payload = jwtDecode<any>(token)
        const jwtId = payload.user_id ?? payload.user ?? payload.sub ?? payload.id ?? payload.pk
        if (jwtId && !isNaN(Number(jwtId))) decodedId = Number(jwtId)
      } catch {}
    }
    const normalizedId = user?.id || (user as any)?.user_id || (user as any)?.pk || decodedId;
    const normalizedUser = { ...user, id: normalizedId! };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(normalizedUser))
  },

  getUser: (): User | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)

    let decodedId: number | undefined
    if (token) {
      try {
        const payload = jwtDecode<any>(token)
        const jwtId = payload.user_id ?? payload.user ?? payload.sub ?? payload.id ?? payload.pk
        if (jwtId && !isNaN(Number(jwtId))) decodedId = Number(jwtId)
      } catch {}
    }

    if (!raw) {
      return decodedId ? ({ id: decodedId } as User) : null
    }

    try {
      const parsed = JSON.parse(raw) as User & { user_id?: number; pk?: number }
      const finalId = parsed?.id || parsed?.user_id || parsed?.pk || decodedId
      return {
        ...parsed,
        id: finalId || 0,
      }
    } catch {
      return null
    }
  },

  hasValidToken: (): boolean => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (!token) return false

    try {
      const payload = jwtDecode<JwtPayload>(token)
      const currentTime = Math.floor(Date.now() / 1000)

      return payload.exp ? payload.exp > currentTime : true
    } catch {
      return false
    }
  },
}

export const getUserId = (user: User | null): number => {
  if (user?.id && user.id > 0) return user.id;
  if ((user as any)?.user_id && Number((user as any).user_id) > 0) return Number((user as any).user_id);
  if ((user as any)?.pk && Number((user as any).pk) > 0) return Number((user as any).pk);

  const token = authService.getAccessToken();
  if (token) {
    try {
      const payload = jwtDecode<any>(token);
      const jwtId = payload.user_id ?? payload.user ?? payload.sub ?? payload.id ?? payload.pk;
      if (jwtId && !isNaN(Number(jwtId)) && Number(jwtId) > 0) {
        return Number(jwtId);
      }
    } catch {}
  }
  return 0;
};