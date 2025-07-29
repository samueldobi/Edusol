import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';

// Ensure baseURL doesn't end with slash to prevent double slashes
const baseURL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';

export const notificationClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('[notificationClient] Base URL:', notificationClient.defaults.baseURL);
addInterceptor(notificationClient); 