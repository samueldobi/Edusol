import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';

// Use environment variable or fallback to the working URL
const baseURL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';

export const notificationClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

addInterceptor(notificationClient); 