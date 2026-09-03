import { authService } from "@/auth/services/auth.service"
import axios from "axios"
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"

// In local development, use '/api' to trigger Vite's proxy.
// In production, fallback to VITE_API_BASE_URL.
const BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : (import.meta.env.VITE_API_BASE_URL||'api' )

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// ==============================
// Request Interceptor
// ==============================

// Endpoints that should never send an Authorization header
// and should not trigger a 401 redirect to /login
const PUBLIC_ENDPOINTS = [
  '/login/', 
  '/users/register/',
  '/product-list/',
  '/product-detail/',
  '/category/',
  '/categories/',
]

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const isPublic = PUBLIC_ENDPOINTS.some((ep) => config.url?.includes(ep))
  const token = authService.getAccessToken()

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Remove Content-Type for FormData so Axios sets the boundary automatically
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  if (import.meta.env.DEV) {
    console.log("📤", config.method?.toUpperCase(), `${config.baseURL}${config.url}`)
  }

  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log("📥", response.status, response.config.url)
    }
    return response
  },
  (error) => {
    const url = error.config?.url ?? ''
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep))

    if (error.response?.status === 401 && !isPublic) {
      authService.clearTokens()

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

// ==============================
// Public API (no auth headers)
// Used for registration and login — never sends a Bearer token.
// ==============================
export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

if (import.meta.env.DEV) {
  publicApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    console.log("📤 [public]", config.method?.toUpperCase(), `${config.baseURL}${config.url}`)
    return config
  })
}

export default api