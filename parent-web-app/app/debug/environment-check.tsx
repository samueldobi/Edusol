"use client";
import { useState, useEffect } from 'react';

export default function EnvironmentCheck() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  useEffect(() => {
    const vars = {
      'NEXT_PUBLIC_BASE_URL': process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
      'NEXT_PUBLIC_AUTH_SERVICE_URL': process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'NOT SET',
      'NEXT_PUBLIC_PAYMENT_SERVICE_URL': process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'NOT SET',
      'NEXT_PUBLIC_NOTIFICATION_SERVICE_URL': process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'NOT SET',
    };
    setEnvVars(vars);
  }, []);

  const testApiCall = async (serviceName: string, baseURL: string) => {
    try {
      console.log(`Testing ${serviceName} API call to:`, baseURL);
      
      const response = await fetch(`${baseURL}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log(`${serviceName} response:`, response.status, response.statusText);
      return { success: response.ok, status: response.status };
    } catch (error: any) {
      console.error(`${serviceName} error:`, error);
      return { success: false, error: error.message };
    }
  };

  const testAllServices = async () => {
    console.log('Testing all services...');
    
    // Test each service
    await testApiCall('Auth', envVars['NEXT_PUBLIC_AUTH_SERVICE_URL']);
    await testApiCall('Payment', envVars['NEXT_PUBLIC_PAYMENT_SERVICE_URL']);
    await testApiCall('Notification', envVars['NEXT_PUBLIC_NOTIFICATION_SERVICE_URL']);
    await testApiCall('Base', envVars['NEXT_PUBLIC_BASE_URL']);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Check</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>

      <button
        onClick={testAllServices}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Test All Services
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Potential Issues:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Different base URLs for different services</li>
          <li>Tokens not being stored properly</li>
          <li>Interceptor not working on some clients</li>
          <li>CORS issues with different domains</li>
        </ul>
      </div>
    </div>
  );
} 