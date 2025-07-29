// "use client";
// import { useState } from 'react';
// import { authServiceClient } from '@/app/src/api/clients/authServiceClient';
// import { AUTH_SERVICE_API } from '@/app/src/api/endpoints/authServiceEndpoints';

// export default function DebugPage() {
//   const [result, setResult] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const testApiCall = async () => {
//     setLoading(true);
//     setResult('');
    
//     try {
//       console.log('Testing API call...');
//       console.log('Base URL:', authServiceClient.defaults.baseURL);
//       console.log('Full URL:', `${authServiceClient.defaults.baseURL}${AUTH_SERVICE_API.PROFILE_GET}`);
      
//       const response = await authServiceClient.get(AUTH_SERVICE_API.PROFILE_GET);
//       setResult(JSON.stringify(response.data, null, 2));
//     } catch (error: any) {
//       console.error('API call failed:', error);
//       setResult(`Error: ${error.message}\n\nConfig: ${JSON.stringify(error.config, null, 2)}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const testFetch = async () => {
//     setLoading(true);
//     setResult('');
    
//     try {
//       const url = `${authServiceClient.defaults.baseURL}${AUTH_SERVICE_API.PROFILE_GET}`;
//       console.log('Testing fetch to:', url);
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       setResult(JSON.stringify(data, null, 2));
//     } catch (error: any) {
//       console.error('Fetch failed:', error);
//       setResult(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">API Debug Page</h1>
      
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
//         <div className="bg-gray-100 p-4 rounded">
//           <p><strong>NEXT_PUBLIC_AUTH_SERVICE_URL:</strong> {process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'NOT SET'}</p>
//           <p><strong>Base URL:</strong> {authServiceClient.defaults.baseURL}</p>
//           <p><strong>Profile Endpoint:</strong> {AUTH_SERVICE_API.PROFILE_GET}</p>
//           <p><strong>Full URL:</strong> {`${authServiceClient.defaults.baseURL}${AUTH_SERVICE_API.PROFILE_GET}`}</p>
//         </div>
//       </div>

//       <div className="space-x-4 mb-4">
//         <button
//           onClick={testApiCall}
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {loading ? 'Testing...' : 'Test Axios Call'}
//         </button>
        
//         <button
//           onClick={testFetch}
//           disabled={loading}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {loading ? 'Testing...' : 'Test Fetch Call'}
//         </button>
//       </div>

//       {result && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold mb-2">Result:</h2>
//           <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
//             {result}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// } 