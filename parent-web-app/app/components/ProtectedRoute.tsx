"use client";
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    console.log('[ProtectedRoute] Auth state changed:', {
      isAuthenticated,
      isLoading,
      hasCheckedAuth,
      user: user ? 'Present' : 'None'
    });
    
    // Only redirect after we've completed the auth check and user is still not authenticated
    if (!isLoading && !isAuthenticated && hasCheckedAuth) {
      console.log('[ProtectedRoute] User not authenticated after auth check, redirecting to login');
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, hasCheckedAuth, router, user]);

  useEffect(() => {
    // Mark that we've completed the auth check
    if (!isLoading) {
      console.log('[ProtectedRoute] Auth check completed, setting hasCheckedAuth to true');
      setHasCheckedAuth(true);
    }
  }, [isLoading]);

  if (isLoading) {
    console.log('[ProtectedRoute] Still loading, showing loading screen');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't redirect immediately if we haven't completed the auth check yet
  if (!isAuthenticated && hasCheckedAuth) {
    console.log('[ProtectedRoute] User not authenticated, redirecting to login');
    router.push('/auth/login');
    return null;
  }

  console.log('[ProtectedRoute] User authenticated, rendering children');
  return <>{children}</>;
} 