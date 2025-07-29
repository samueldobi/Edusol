import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';

export const schoolClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});
addInterceptor(schoolClient);