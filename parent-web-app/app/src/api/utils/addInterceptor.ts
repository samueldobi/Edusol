
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
          config.headers['X-Refresh-Token'] = refreshToken;
          config.headers['refresh-token'] = refreshToken;
        }

        // Add additional headers that might be required
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
  
        return config;
      },
      (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

   
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
      
        if (error.response?.status !== 401 && error.response?.status !== 403) {
          console.error('🚨 API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
          });
        }
        
       
        return Promise.reject(error);
      }
    );
  };