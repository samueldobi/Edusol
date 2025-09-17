"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as authLogin, logout as authLogout, refreshToken, AuthResponse } from '@/app/src/api/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  role: string; 
  profile?: Record<string, unknown>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshAuthToken: () => Promise<boolean>;
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

  const refreshAuthToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) {
        return false;
      }

      const response = await refreshToken({ refreshToken: refreshTokenValue });
      
      if (response.tokens?.accessToken) {
        localStorage.setItem('token', response.tokens.accessToken);
        localStorage.setItem('refreshToken', response.tokens.refreshToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Decode token
  const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        
        if (!token || !userData) {
          setIsLoading(false);
          return;
        }

        const parsedUserData = JSON.parse(userData);
        const decoded = decodeToken(token);
        console.log("Decoded token:", decoded);

        
        setUser({
          id: parsedUserData.id,
          email: parsedUserData.email || '',
          name: parsedUserData.name || 'User',
          role: decoded?.role || "USER",
        });
        
      } catch (error: unknown) {
        console.error('Auth check error:', error);
        // Try to refresh token before clearing auth data
        const refreshSuccess = await refreshAuthToken();
        if (!refreshSuccess) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response: AuthResponse = await authLogin({ email, password });
      
      if (!response || !response.success || !response.tokens || !response.tokens.accessToken) {
        throw new Error('Invalid response from login API');
      }
      
      localStorage.setItem('token', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      
      const decoded = decodeToken(response.tokens.accessToken);
      
      const userData = response.user || {
        id: 'user-' + Date.now(),
        email: email,
        name: email.split('@')[0],
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: decoded?.role || "USER",
      });
      
    } catch (error: unknown) {
      let errorMessage = 'Login failed';
      
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error - please check your connection';
      } else if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { status?: number; data?: { message?: string } } }).response;
        if (response?.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (response?.status === 403) {
          errorMessage = 'Access forbidden - please contact support';
        } else if (response?.data?.message) {
          errorMessage = response.data.message;
        }
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await authLogout();
        } catch (logoutError: unknown) {
          // Continue with logout even if API call fails
          console.warn('Logout API call failed:', logoutError);
        }
      }
    } catch (error: unknown) {
      // Handle logout error silently
      console.warn('Logout error:', error);
    } finally {
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
        return;
      }
    } catch (error: unknown) {
      // Don't automatically logout on profile fetch failure
      console.warn('Profile fetch error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
    refreshAuthToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 