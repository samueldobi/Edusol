import axios from 'axios';

export const schoolClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SCHOOL_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});