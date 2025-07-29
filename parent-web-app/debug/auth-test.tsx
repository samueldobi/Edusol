"use client";
import { useState } from 'react';

export default function AuthTest() {
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
        
        const username = payload.email || payload.sub || 'admin';
        const password = token.substring(0, 20);
        const basicAuth = btoa(`${username}:${password}`);

        // Test 1: Bearer Token
        newResults.bearer = await testAuthMethod('Bearer Token', {
          'Authorization': `Bearer ${token}`
        });

        // Test 2: Basic Auth
        newResults.basic = await testAuthMethod('Basic Auth', {
          'Authorization': `Basic ${basicAuth}`
        });

        // Test 3: Cookie Auth
        newResults.cookie = await testAuthMethod('Cookie Auth', {
          'Cookie': `sessionid=${token}`
        });

        // Test 4: Basic Auth + Cookie
        newResults.basicCookie = await testAuthMethod('Basic Auth + Cookie', {
          'Authorization': `Basic ${basicAuth}`,
          'Cookie': `sessionid=${token}`
        });

        // Test 5: Bearer + Cookie
        newResults.bearerCookie = await testAuthMethod('Bearer + Cookie', {
          'Authorization': `Bearer ${token}`,
          'Cookie': `sessionid=${token}`
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
      <h1 className="text-2xl font-bold mb-4">School Service Auth Test</h1>
      
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
          <li><strong>Bearer Token:</strong> Authorization: Bearer {token}</li>
          <li><strong>Basic Auth:</strong> Authorization: Basic base64(username:password)</li>
          <li><strong>Cookie Auth:</strong> Cookie: sessionid=token</li>
          <li><strong>Combined:</strong> Basic Auth + Cookie</li>
          <li><strong>Combined:</strong> Bearer + Cookie</li>
        </ul>
      </div>
    </div>
  );
} 