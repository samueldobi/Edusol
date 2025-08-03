import axios from 'axios';
// import { addInterceptor } from '../utils/addInterceptor';

// i prevented prevent double slashes
const baseURL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL?.replace(/\/$/, '') || '';

export const paymentServiceClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// addInterceptor(paymentServiceClient); 