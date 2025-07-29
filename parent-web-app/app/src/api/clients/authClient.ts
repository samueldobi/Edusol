import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';

export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

addInterceptor(authClient);