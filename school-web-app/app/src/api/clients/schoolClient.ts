import axios from 'axios';

// Use environment variable or fallback to the working URL
const baseURL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || '';

export const schoolClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});