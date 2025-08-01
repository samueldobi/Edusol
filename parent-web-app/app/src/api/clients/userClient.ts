import axios from 'axios';
import { addInterceptor } from '../utils/addInterceptor';
export const userClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// addInterceptor(userClient);