"use client";
import { useState } from 'react';

export default function SchoolAuthTest() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const testAuthMethod = async (method: string, headers: Record<string, string>) => {
    try {
      console.log(`Testing ${method}...`);
      
      const response = await fetch('https://api-gateway-ms-app.fly.dev/api/schools/fees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
      });
      
      const data = await response.json();
      console.log(`${method} response:`, response.status, data);
      return { success: response.ok, status: response.status, data };
    } catch (error: any) {
      console.error(`${method} error:`, error);
      return { success: false, error: error.message };
    }
  };

  const testAllAuthMethods = async () => {
    setLoading(true);
    const newResults: Record<string, any> = {};

    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (token) {
      try {
        // Decode JWT to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded payload:', payload);
        
        const userId = payload.id;
        const userRole = payload.role;
        const password = token.substring(0, 20);

        // Test 1: Basic Auth with User ID
        const basicAuthUserId = btoa(`${userId}:${password}`);
        newResults.basicUserId = await testAuthMethod('Basic Auth (User ID)', {
          'Authorization': `Basic ${basicAuthUserId}`
        });

        // Test 2: Basic Auth with Role
        const basicAuthRole = btoa(`${userRole}:${password}`);
        newResults.basicRole = await testAuthMethod('Basic Auth (Role)', {
          'Authorization': `Basic ${basicAuthRole}`
        });

        // Test 3: Basic Auth with Admin
        const basicAuthAdmin = btoa(`admin:${password}`);
        newResults.basicAdmin = await testAuthMethod('Basic Auth (Admin)', {
          'Authorization': `Basic ${basicAuthAdmin}`
        });

        // Test 4: Bearer Token
        newResults.bearer = await testAuthMethod('Bearer Token', {
          'Authorization': `Bearer ${token}`
        });

        // Test 5: Custom Headers
        newResults.customHeaders = await testAuthMethod('Custom Headers', {
          'X-User-ID': userId,
          'X-User-Role': userRole,
          'X-Auth-Token': token
        });

        // Test 6: Combined Basic + Custom Headers
        newResults.combined = await testAuthMethod('Combined Basic + Custom Headers', {
          'Authorization': `Basic ${basicAuthUserId}`,
          'X-User-ID': userId,
          'X-User-Role': userRole,
          'X-Auth-Token': token
        });

        // Test 7: Try with common API key patterns
        newResults.apiKey = await testAuthMethod('API Key Pattern', {
          'X-API-Key': token,
          'Authorization': `Bearer ${token}`
        });

        // Test 8: Try with session token pattern
        newResults.sessionToken = await testAuthMethod('Session Token Pattern', {
          'X-Session-Token': token,
          'Authorization': `Bearer ${token}`
        });

      } catch (error) {
        console.error('Error decoding token:', error);
        newResults.error = { success: false, error: 'Token decode failed' };
      }
    } else {
      newResults.error = { success: false, error: 'No token found' };
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Service Authentication Test</h1>
      
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        <strong>Note:</strong> The school service uses HTTP Basic Auth + Cookie Auth. 
        Since browsers block Cookie headers, we're testing different Basic Auth combinations.
      </div>
      
      <button
        onClick={testAllAuthMethods}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test All Auth Methods'}
      </button>

      <div className="mt-6 space-y-4">
        {Object.entries(results).map(([method, result]) => (
          <div key={method} className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">{method}</h3>
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
        <h3 className="text-lg font-semibold mb-2">Authentication Methods Tested:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Basic Auth (User ID):</strong> Using JWT payload.id as username</li>
          <li><strong>Basic Auth (Role):</strong> Using JWT payload.role as username</li>
          <li><strong>Basic Auth (Admin):</strong> Using 'admin' as username</li>
          <li><strong>Bearer Token:</strong> Standard Bearer authentication</li>
          <li><strong>Custom Headers:</strong> X-User-ID, X-User-Role, X-Auth-Token</li>
          <li><strong>Combined:</strong> Basic Auth + Custom Headers</li>
          <li><strong>API Key Pattern:</strong> X-API-Key header</li>
          <li><strong>Session Token Pattern:</strong> X-Session-Token header</li>
        </ul>
      </div>
    </div>
  );
} 