// src/lib/api.ts
import axios from "axios"
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { authService } from "@/client/feature/auth/services/auth.service"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

// ==============================
// Request Interceptor
// ==============================

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authService.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`

  if (import.meta.env.DEV) {
    console.log("📤", config.method?.toUpperCase(), config.url)
  }

  return config
})

// ==============================
// Response Interceptor
// ==============================

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log("📥", response.status, response.config.url)
    }
    return response
  },
  (error) => {
    // No refresh endpoint exists on the backend yet — on any 401,
    // clear tokens and send the user back to login. Revisit once
    // a real refresh endpoint is added.
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