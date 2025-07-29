"use client";
import { useState } from 'react';
import { schoolClient } from '@/app/src/api/clients/schoolClient';
import { paymentServiceClient } from '@/app/src/api/clients/paymentServiceClient';
import { notificationClient } from '@/app/src/api/clients/notificationClient';
import { authServiceClient } from '@/app/src/api/clients/authClient';

export default function ServiceTest() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const testService = async (serviceName: string, client: any, endpoint: string) => {
    try {
      console.log(`Testing ${serviceName}...`);
      const response = await client.get(endpoint);
      console.log(`${serviceName} success:`, response.data);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error(`${serviceName} error:`, error);
      return { 
        success: false, 
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      };
    }
  };

  const testAllServices = async () => {
    setLoading(true);
    const newResults: Record<string, any> = {};

    // Test School Service (uses same base URL as auth)
    newResults.school = await testService('School Service', schoolClient, '/api/classes');

    // Test Payment Service (uses different URL)
    newResults.payment = await testService('Payment Service', paymentServiceClient, '/api/payments');

    // Test Notification Service (uses different URL)
    newResults.notification = await testService('Notification Service', notificationClient, '/api/notifications');

    // Test Auth Service (should work)
    newResults.auth = await testService('Auth Service', authServiceClient, '/api/profile');

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Service API Test</h1>
      
      <button
        onClick={testAllServices}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test All Services'}
      </button>

      <div className="mt-6 space-y-4">
        {Object.entries(results).map(([service, result]) => (
          <div key={service} className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">{service}</h3>
            <div className="space-y-1">
              <p><strong>Success:</strong> {result.success ? '✅ YES' : '❌ NO'}</p>
              {result.status && <p><strong>Status:</strong> {result.status}</p>}
              {result.error && <p><strong>Error:</strong> {result.error}</p>}
              {result.data && (
                <div>
                  <strong>Response:</strong>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Analysis:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>School Service uses same base URL as auth - should work</li>
          <li>Payment/Notification use different URLs - might have different auth setup</li>
          <li>Check if tokens are being sent in headers</li>
          <li>Check if different services require different auth methods</li>
        </ul>
      </div>
    </div>
  );
} 