
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from '../services/authService';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

export const addInterceptor = (client: AxiosInstance) => {  
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const refreshTokenValue = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        if (refreshTokenValue) {
          config.headers['x-refresh-token'] = refreshTokenValue;
          config.headers['X-Refresh-Token'] = refreshTokenValue;
          config.headers['refresh-token'] = refreshTokenValue;
        }

        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
  
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
         
          
          if (isRefreshing) {
     
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return client(originalRequest);
            }).catch(err => {
   
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const refreshTokenValue = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    

          if (!refreshTokenValue) {
 
            processQueue(new Error('No refresh token available'), null);
            isRefreshing = false;
            
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              window.location.href = '/auth/login';
            }
            return Promise.reject(error);
          }

          try {       
            const response = await refreshToken({ refreshToken: refreshTokenValue });
            
            if (response.tokens?.accessToken) {
              localStorage.setItem('token', response.tokens.accessToken);
              localStorage.setItem('refreshToken', response.tokens.refreshToken);
              
              processQueue(null, response.tokens.accessToken);
              
              originalRequest.headers.Authorization = `Bearer ${response.tokens.accessToken}`;

              return client(originalRequest);
            } else {
              throw new Error('No access token in refresh response');
            }
          } catch (refreshError) {
            processQueue(refreshError, null);
            isRefreshing = false;
            
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              window.location.href = '/auth/login';
            }
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
        
        return Promise.reject(error);
      }
    );
  };