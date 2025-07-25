import axios from 'axios';

export const userClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});