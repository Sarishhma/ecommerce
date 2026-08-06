import axios from "axios";

import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// ==============================
// Constants
// ==============================

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

// ==============================
// Axios Instance
// ==============================

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// Types
// ==============================

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// interface RefreshResponse {
//   data?: {
//     accessToken: string;
//     refreshToken?: string;
//   };
//   accessToken?: string;
//   refreshToken?: string;
// }

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

// ==============================
// Refresh Queue
// ==============================

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null
): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });

  failedQueue = [];
};

// ==============================
// Request Interceptor
// ==============================

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log("📤", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// Response Interceptor
// ==============================

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log("📥", response.status, response.config.url);
    }

    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        if (!refreshToken) {
          throw new Error("Refresh token not found.");
        }

        const { data } = await axios.post(`${BASE_URL.replace(/\/$/, '')}/auth/refresh`, { refreshToken });

        const newAccessToken =
          data.data?.accessToken ?? data.accessToken;

        const newRefreshToken =
          data.data?.refreshToken ?? data.refreshToken;

        if (!newAccessToken) {
          throw new Error("Failed to obtain access token.");
        }

        localStorage.setItem(
          STORAGE_KEYS.ACCESS_TOKEN,
          newAccessToken
        );

        if (newRefreshToken) {
          localStorage.setItem(
            STORAGE_KEYS.REFRESH_TOKEN,
            newRefreshToken
          );
        }

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

       if (window.location.pathname !== '/login') {
  window.location.href = '/login';
}

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;