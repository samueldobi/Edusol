
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Interceptor to add Authorization and x-refresh-token headers
export const addInterceptor = (client: AxiosInstance) => {  
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Only add tokens if they exist in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (refreshToken) {
          config.headers['x-refresh-token'] = refreshToken;
        }
  
        return config;
      },
      (error) => Promise.reject(error)
    );
  };