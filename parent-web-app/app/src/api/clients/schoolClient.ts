import axios from 'axios';
import { addSchoolInterceptor } from '../utils/addSchoolInterceptor';

export const schoolClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// addSchoolInterceptor(schoolClient);