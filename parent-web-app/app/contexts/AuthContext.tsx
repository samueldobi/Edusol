"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as authLogin, logout as authLogout, AuthResponse, fetchProfile, ProfileType } from '@/app/src/api/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  profile?: ProfileType;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          console.log('No token or user data found, user is not authenticated');
          setIsLoading(false);
          return;
        }

        console.log('Checking auth with token:', token.substring(0, 20) + '...');
        console.log('Auth service URL:', process.env.NEXT_PUBLIC_AUTH_SERVICE_URL);
        
        // Try to fetch user profile to validate token
        try {
          const profile = await fetchProfile();
          const parsedUserData = JSON.parse(userData);
          
          setUser({
            id: parsedUserData.id || profile.user_id,
            email: parsedUserData.email || '',
            name: parsedUserData.name || `${profile.first_name} ${profile.last_name}`,
            profile,
          });
          console.log('User authenticated successfully');
        } catch (profileError) {
          console.error('Profile fetch failed, clearing invalid tokens:', profileError);
          // Clear invalid tokens
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login with email:', email);
      console.log('Auth service URL:', process.env.NEXT_PUBLIC_AUTH_SERVICE_URL);
      
      const response: AuthResponse = await authLogin({ email, password });
      
      // Validate response data
      if (!response || !response.success || !response.tokens || !response.tokens.accessToken) {
        throw new Error('Invalid response from login API');
      }
      
      console.log('Login response:', response);
      
      // Store tokens and user data
      localStorage.setItem('token', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      
      // Store user data if available, otherwise create basic user data
      const userData = response.user || {
        id: 'user-' + Date.now(),
        email: email,
        name: email.split('@')[0], // Use email prefix as name
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Try to fetch user profile
      try {
        const profile = await fetchProfile();
        
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          profile,
        });
      } catch (profileError) {
        console.error('Profile fetch failed after login:', profileError);
        // Still set user with basic data even if profile fetch fails
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
        });
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Login failed';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error - please check your connection';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access forbidden - please contact support';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API if token exists
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await authLogout();
        } catch (logoutError) {
          console.error('Logout API call failed:', logoutError);
          // Continue with logout even if API call fails
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear all auth data
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, cannot refresh user');
        return;
      }

      const profile = await fetchProfile();
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      
      setUser({
        id: userData.id || profile.user_id,
        email: userData.email || '',
        name: userData.name || `${profile.first_name} ${profile.last_name}`,
        profile,
      });
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If profile fetch fails, user might be logged out
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 