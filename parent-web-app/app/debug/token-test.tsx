"use client";
import { useState, useEffect } from 'react';

export default function TokenTest() {
  const [tokenInfo, setTokenInfo] = useState({
    token: '',
    refreshToken: '',
    hasToken: false,
    hasRefreshToken: false
  });

  useEffect(() => {
    const checkTokens = () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      
      setTokenInfo({
        token: token || '',
        refreshToken: refreshToken || '',
        hasToken: !!token,
        hasRefreshToken: !!refreshToken
      });
    };

    checkTokens();
    // Check every 2 seconds
    const interval = setInterval(checkTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  const clearTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setTokenInfo({
      token: '',
      refreshToken: '',
      hasToken: false,
      hasRefreshToken: false
    });
  };

  const setTestTokens = () => {
    localStorage.setItem('token', 'test-token-123');
    localStorage.setItem('refreshToken', 'test-refresh-token-456');
    setTokenInfo({
      token: 'test-token-123',
      refreshToken: 'test-refresh-token-456',
      hasToken: true,
      hasRefreshToken: true
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Token Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">Token Status:</h2>
        <div className="space-y-2">
          <p><strong>Has Token:</strong> {tokenInfo.hasToken ? '✅ YES' : '❌ NO'}</p>
          <p><strong>Has Refresh Token:</strong> {tokenInfo.hasRefreshToken ? '✅ YES' : '❌ NO'}</p>
          <p><strong>Token Preview:</strong> {tokenInfo.token ? `${tokenInfo.token.substring(0, 20)}...` : 'NONE'}</p>
          <p><strong>Refresh Token Preview:</strong> {tokenInfo.refreshToken ? `${tokenInfo.refreshToken.substring(0, 20)}...` : 'NONE'}</p>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={setTestTokens}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Test Tokens
        </button>
        <button
          onClick={clearTokens}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Tokens
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Login to the app first</li>
          <li>Check if tokens are stored</li>
          <li>Try making API calls to other services</li>
          <li>Check browser console for interceptor logs</li>
        </ol>
      </div>
    </div>
  );
} 