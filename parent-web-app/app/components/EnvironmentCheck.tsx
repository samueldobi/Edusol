"use client";
import { useEffect, useState } from 'react';

export default function EnvironmentCheck() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  useEffect(() => {
    const vars = {
      'NEXT_PUBLIC_AUTH_SERVICE_URL': process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'NOT SET',
      'NEXT_PUBLIC_PAYMENT_SERVICE_URL': process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'NOT SET',
      'NEXT_PUBLIC_NOTIFICATION_SERVICE_URL': process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'NOT SET',
      'NEXT_PUBLIC_BASE_URL': process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
    };
    setEnvVars(vars);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; 
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Environment Variables (Debug)</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="mb-1">
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
} 