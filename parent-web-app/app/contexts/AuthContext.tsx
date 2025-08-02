"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as authLogin, logout as authLogout, AuthResponse } from '@/app/src/api/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  profile?: any;
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
        
        setUser({
          id: parsedUserData.id,
          email: parsedUserData.email || '',
          name: parsedUserData.name || 'User',
        });
        
      } catch (error) {
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
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
      });
      
    } catch (error: any) {
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
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await authLogout();
        } catch (logoutError) {
          // Continue with logout even if API call fails
        }
      }
    } catch (error) {
      // Handle logout error silently
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
    } catch (error) {
      // Don't automatically logout on profile fetch failure
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