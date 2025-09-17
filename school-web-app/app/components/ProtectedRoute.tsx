"use client";
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children,roles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(true);

      if (!isAuthenticated) {
        router.push('/auth/login');
      } else if (roles && !roles.includes(user?.role || "")) {
        router.push('/unauthorized'); 
      }
    }
  }, [isAuthenticated, isLoading, hasCheckedAuth, router, user, roles]);
  useEffect(() => {
    // Mark that we've completed the auth check
    if (!isLoading) {
       setHasCheckedAuth(true);
    }
  }, [isLoading]);

  if (isLoading) {
   
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
   
    router.push('/auth/login');
    return null;
  }
  return <>{children}</>;
} 