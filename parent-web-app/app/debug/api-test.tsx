"use client";
import { useState } from 'react';
import { publicAuthClient } from '@/app/src/api/clients/publicAuthClient';
import { AUTH_API } from '@/app/src/api/endpoints/authEndpoints';

export default function ApiTest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Testing API connection...');
      console.log('Base URL:', publicAuthClient.defaults.baseURL);
      console.log('Login endpoint:', AUTH_API.LOGIN);
      console.log('Full URL:', `${publicAuthClient.defaults.baseURL}${AUTH_API.LOGIN}`);
      
      // Test with a simple GET request to see if server is reachable
      const response = await fetch(`${publicAuthClient.defaults.baseURL}${AUTH_API.LOGIN}`, {
        method: 'OPTIONS', // Preflight request
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setResult(`Connection test result:\nStatus: ${response.status}\nStatus Text: ${response.statusText}\nHeaders: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);
    } catch (error: any) {
      console.error('Connection test failed:', error);
      setResult(`Connection failed:\nError: ${error.message}\nType: ${error.name}\nCode: ${error.code}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const testData = {
        email: 'test@example.com',
        password: 'testpassword'
      };
      
      console.log('Testing login with:', testData);
      
      const response = await publicAuthClient.post(AUTH_API.LOGIN, testData);
      setResult(`Login test result:\nStatus: ${response.status}\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error('Login test failed:', error);
      setResult(`Login test failed:\nError: ${error.message}\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>NEXT_PUBLIC_BASE_URL:</strong> {process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET'}</p>
          <p><strong>Base URL:</strong> {publicAuthClient.defaults.baseURL}</p>
          <p><strong>Login Endpoint:</strong> {AUTH_API.LOGIN}</p>
          <p><strong>Full URL:</strong> {`${publicAuthClient.defaults.baseURL}${AUTH_API.LOGIN}`}</p>
        </div>
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
} 