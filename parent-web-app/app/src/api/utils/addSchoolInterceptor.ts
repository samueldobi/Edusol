import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Interceptor specifically for school service authentication
export const addSchoolInterceptor = (client: AxiosInstance) => {  
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get tokens from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
        console.log('🏫 School Interceptor running for:', config.url);
        console.log('   Token found:', token ? 'YES' : 'NO');
        console.log('   Refresh token found:', refreshToken ? 'YES' : 'NO');
  
        if (token) {
          try {
            // Decode JWT token to get user info
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('   Decoded token payload:', payload);
            
            // For school service, we need to use proper credentials
            // Since the JWT doesn't have email, we'll use the user ID and role
            const username = payload.id || 'admin';
            const password = token.substring(0, 20); // Use part of token as password
            
            // Create Basic Auth header
            const basicAuth = btoa(`${username}:${password}`);
            config.headers.Authorization = `Basic ${basicAuth}`;
            
            // Note: We can't set Cookie header in browser - it's blocked
            // The server should handle session management through other means
            
            // Add additional auth headers that might work
            config.headers['X-User-ID'] = payload.id;
            config.headers['X-User-Role'] = payload.role;
            config.headers['X-Auth-Token'] = token;
            
            console.log('   ✅ Basic Auth header set');
            console.log('   ✅ User ID and Role headers set');
            console.log('   ✅ Auth token header set');
          } catch (error) {
            console.error('   ❌ Error decoding token:', error);
            // Fallback to Bearer token if decoding fails
            config.headers.Authorization = `Bearer ${token}`;
            console.log('   ✅ Fallback Bearer token set');
          }
        } else {
          console.log('   ❌ No token found for school service');
        }
        
        if (refreshToken) {
          config.headers['x-refresh-token'] = refreshToken;
          console.log('   ✅ x-refresh-token header set');
        }

        // Add additional headers
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
  
        console.log('   Final headers:', config.headers);
        return config;
      },
      (error) => {
        console.error('❌ School Interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle auth errors
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('🚨 School API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.config?.headers
        });
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('🔑 School service authentication failed');
          console.log('   This might require different credentials or authentication method');
        }
        
        return Promise.reject(error);
      }
    );
  }; 