"use client";
import { useState } from 'react';

export default function SimpleSchoolTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testNoAuth = async () => {
    setLoading(true);
    try {
      console.log('Testing school service without authentication...');
      
      const response = await fetch('https://api-gateway-ms-app.fly.dev/api/schools/fees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('Response:', response.status, data);
      setResult({ success: response.ok, status: response.status, data });
    } catch (error: any) {
      console.error('Error:', error);
      setResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  const testWithBearer = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Testing school service with Bearer token...');
      
      const response = await fetch('https://api-gateway-ms-app.fly.dev/api/schools/fees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      const data = await response.json();
      console.log('Response:', response.status, data);
      setResult({ success: response.ok, status: response.status, data });
    } catch (error: any) {
      console.error('Error:', error);
      setResult({ success: false, error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simple School Service Test</h1>
      
      <div className="space-x-4 mb-6">
        <button
          onClick={testNoAuth}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Without Auth'}
        </button>
        
        <button
          onClick={testWithBearer}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test With Bearer Token'}
        </button>
      </div>

      {result && (
        <div className="border rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Result</h3>
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
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">What This Tests:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>No Authentication:</strong> See if the endpoint works without any auth</li>
          <li><strong>Bearer Token:</strong> See if simple Bearer token works</li>
          <li>This will help determine if the issue is with authentication or something else</li>
        </ul>
      </div>
    </div>
  );
} 