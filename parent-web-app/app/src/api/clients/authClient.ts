import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';

// Ensure baseURL doesn't end with slash to prevent double slashes
const baseURL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';
const authServiceURL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL?.replace(/\/$/, '') || '';

// Public auth client for login/register endpoints that don't need authentication
export const publicAuthClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authenticated auth client for endpoints that require authentication
export const authClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth service client for comprehensive auth service endpoints
export const authServiceClient = axios.create({
  baseURL: authServiceURL || baseURL, // Fallback to baseURL if auth service URL not set
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors to authenticated clients
addInterceptor(authClient);
addInterceptor(authServiceClient);