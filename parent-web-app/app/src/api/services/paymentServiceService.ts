import { paymentServiceClient } from '../clients/paymentServiceClient';
import { PAYMENT_SERVICE_API } from '../endpoints/paymentServiceEndpoints';

// --- Types ---
export interface PaymentType {
  id?: string;
  _id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  payment_method: string;
  user_id: string;
  description?: string;
  reference?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PaymentAccountType {
  id: number;
  userId: string;
  contractCode: string;
  accountReference: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  currencyCode: string;
  customerName: string;
  customerEmail: string;
  accountBalance: number;
  createdAt: string;
}

export interface PaymentTransactionType {
  id?: string;
  _id?: string;
  payment_id: string;
  user_id: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference: string;
  description?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SchoolAccountType {
  id?: string;
  _id?: string;
  school_id: string;
  account_number: string;
  bank_name: string;
  account_name: string;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentPayload {
  amount: number;
  currency: string;
  payment_method: string;
  user_id: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface CreatePaymentAccountPayload {
  user_id: string;
  bank_name: string;
  account_name: string;
  currency: string;
}

export interface UpdateSchoolAccountPayload {
  school_id: string;
  account_number?: string;
  bank_name?: string;
  account_name?: string;
  is_active?: boolean;
}

// --- Payment Functions ---
export const fetchPaymentsList = async (): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENTS);
  return response.data;
};

export const fetchPaymentById = async (id: string): Promise<PaymentType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPayment = async (data: CreatePaymentPayload): Promise<PaymentType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.PAYMENTS, data);
  return response.data;
};

// --- Guardian Payment Functions ---
export const fetchGuardianPayments = async (): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_BY_GUARDIAN);
  return response.data;
};

// --- School Payment Functions ---
export const fetchSchoolPayments = async (): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_BY_SCHOOL);
  return response.data;
};

// --- User Payment Functions ---
export const fetchUserPayments = async (): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENTS_BY_USER);
  return response.data;
};

// --- Payment Account Functions ---
export const fetchPaymentAccounts = async (): Promise<PaymentAccountType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.ACCOUNTS);
  return response.data;
};

export const fetchUserPaymentAccount = async (): Promise<PaymentAccountType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.USER_ACCOUNT);
  return response.data;
};

export const createPaymentAccount = async (data: CreatePaymentAccountPayload): Promise<PaymentAccountType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.ACCOUNTS, data);
  return response.data;
};

// --- Payment Transaction Functions ---
export const fetchPaymentTransactions = async (): Promise<PaymentTransactionType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_TRANSACTIONS);
  return response.data;
};

export const fetchUserPaymentTransactions = async (): Promise<PaymentTransactionType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.TRANSACTION_FOR_USER);
  return response.data;
};

export const fetchPaymentTransactionById = async (id: string): Promise<PaymentTransactionType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.TRANSACTION_BY_ID.replace('{id}', id));
  return response.data;
};

// --- School Account Functions ---
export const fetchSchoolAccount = async (): Promise<SchoolAccountType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.SCHOOL_ACCOUNT);
  return response.data;
};

export const updateSchoolAccount = async (id: string, data: UpdateSchoolAccountPayload): Promise<SchoolAccountType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.SCHOOL_ACCOUNT_BY_ID.replace('{id}', id), data);
  return response.data;
};

// --- Webhook Functions ---
export const processPaymentWebhook = async (data: any): Promise<any> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.NOTIFICATION_WEBHOOK, data);
  return response.data;
}; 