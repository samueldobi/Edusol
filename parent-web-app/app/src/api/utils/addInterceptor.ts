
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Interceptor to add Authorization and x-refresh-token headers
export const addInterceptor = (client: AxiosInstance) => {  
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Only add tokens if they exist in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
        // console.log('🔐 Interceptor running for:', config.url);
        // console.log('   Token found:', token ? 'YES' : 'NO');
        // console.log('   Refresh token found:', refreshToken ? 'YES' : 'NO');
        // console.log('   Token preview:', token ? `${token.substring(0, 20)}...` : 'NONE');
  
        if (token) {
          // Try different authorization header formats
          config.headers.Authorization = `Bearer ${token}`;
          // Some APIs might use different header names
          // config.headers['Authorization'] = `Bearer ${token}`;
          // config.headers['authorization'] = `Bearer ${token}`;
          // console.log('   ✅ Authorization header set');
        } else {
          console.log('   ❌ No token found, skipping Authorization header');
        }
        
        if (refreshToken) {
          config.headers['x-refresh-token'] = refreshToken;
          config.headers['X-Refresh-Token'] = refreshToken;
          config.headers['refresh-token'] = refreshToken;
          console.log('   ✅ x-refresh-token header set');
        } else {
          console.log('   ❌ No refresh token found, skipping x-refresh-token header');
        }

        // Add additional headers that might be required
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
  
        // console.log('   Final headers:', config.headers);
        return config;
      },
      (error) => {
        console.error('❌ Interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle auth errors
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('🚨 API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers
        });
        
        // If we get a 401/403, the token might be invalid
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('🔑 Authentication failed, token might be invalid');
          // You could trigger a logout or token refresh here
        }
        
        return Promise.reject(error);
      }
    );
  };