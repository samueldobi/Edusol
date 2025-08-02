import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Auth client for all auth operations
export const authClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('[authClient] Base URL:', baseURL);

// Add interceptor to auth client
addInterceptor(authClient);