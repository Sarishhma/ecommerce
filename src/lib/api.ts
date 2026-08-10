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

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authService.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`

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
    if (error.response?.status === 401) {
      authService.clearTokens()

      if (window.location.pathname !== "/login") {
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default api