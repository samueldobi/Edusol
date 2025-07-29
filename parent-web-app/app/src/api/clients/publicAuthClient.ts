import axios from 'axios';

// Public auth client for login/register endpoints that don't need authentication
export const publicAuthClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}); 