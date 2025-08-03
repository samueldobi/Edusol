import { AxiosInstance } from 'axios';

export const addSchoolInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const username = payload.id || 'admin';
            const password = token.substring(0, 20);
            const basicAuth = btoa(`${username}:${password}`);

            config.headers.Authorization = `Basic ${basicAuth}`;
            config.headers['X-User-ID'] = payload.id;
            config.headers['X-User-Role'] = payload.role;
            config.headers['X-Auth-Token'] = token;
          } catch (error) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        if (refreshToken) {
          config.headers['x-refresh-token'] = refreshToken;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Handle authentication errors silently
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );
}; 