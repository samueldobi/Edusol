import { paymentServiceClient } from '../clients/paymentServiceClient';
import { PAYMENT_SERVICE_API } from '../endpoints/paymentServiceEndpoints';

// --- Types ---
export interface PaymentType {
  id: string;
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

export interface PaymentMethodType {
  id: string;
  user_id: string;
  type: 'card' | 'bank_account' | 'mobile_money' | 'crypto';
  provider: string;
  account_number?: string;
  card_last4?: string;
  card_brand?: string;
  expiry_month?: number;
  expiry_year?: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentPlanType {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  interval: 'one_time' | 'monthly' | 'quarterly' | 'yearly';
  interval_count: number;
  trial_period_days?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionType {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  trial_start?: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceType {
  id: string;
  user_id: string;
  subscription_id?: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  due_date: string;
  paid_at?: string;
  description?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface RefundType {
  id: string;
  payment_id: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface WebhookType {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  secret_key?: string;
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

export interface CreatePaymentMethodPayload {
  user_id: string;
  type: 'card' | 'bank_account' | 'mobile_money' | 'crypto';
  provider: string;
  account_number?: string;
  card_number?: string;
  card_brand?: string;
  expiry_month?: number;
  expiry_year?: number;
  is_default?: boolean;
}

export interface CreatePaymentPlanPayload {
  name: string;
  description?: string;
  amount: number;
  currency: string;
  interval: 'one_time' | 'monthly' | 'quarterly' | 'yearly';
  interval_count: number;
  trial_period_days?: number;
}

export interface CreateSubscriptionPayload {
  user_id: string;
  plan_id: string;
  trial_period_days?: number;
}

export interface CreateInvoicePayload {
  user_id: string;
  amount: number;
  currency: string;
  due_date: string;
  description?: string;
  subscription_id?: string;
}

export interface CreateRefundPayload {
  payment_id: string;
  amount: number;
  reason: string;
}

export interface CreateWebhookPayload {
  url: string;
  events: string[];
  secret_key?: string;
}

export interface ProcessPaymentPayload {
  payment_id: string;
  payment_method_id: string;
}

// --- Payment Functions ---
export const fetchPaymentsList = async (): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENTS_LIST);
  return response.data;
};

export const fetchPaymentById = async (id: string): Promise<PaymentType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENTS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPayment = async (data: CreatePaymentPayload): Promise<PaymentType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.PAYMENTS_CREATE, data);
  return response.data;
};

export const updatePayment = async (id: string, data: PaymentType): Promise<PaymentType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.PAYMENTS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdatePayment = async (id: string, data: Partial<PaymentType>): Promise<PaymentType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.PAYMENTS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deletePayment = async (id: string): Promise<PaymentType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.PAYMENTS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Payment Method Functions ---
export const fetchPaymentMethodsList = async (): Promise<PaymentMethodType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_METHODS_LIST);
  return response.data;
};

export const fetchPaymentMethodById = async (id: string): Promise<PaymentMethodType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_METHODS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPaymentMethod = async (data: CreatePaymentMethodPayload): Promise<PaymentMethodType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.PAYMENT_METHODS_CREATE, data);
  return response.data;
};

export const updatePaymentMethod = async (id: string, data: PaymentMethodType): Promise<PaymentMethodType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.PAYMENT_METHODS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdatePaymentMethod = async (id: string, data: Partial<PaymentMethodType>): Promise<PaymentMethodType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.PAYMENT_METHODS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deletePaymentMethod = async (id: string): Promise<PaymentMethodType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.PAYMENT_METHODS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Payment Plan Functions ---
export const fetchPaymentPlansList = async (): Promise<PaymentPlanType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_PLANS_LIST);
  return response.data;
};

export const fetchPaymentPlanById = async (id: string): Promise<PaymentPlanType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.PAYMENT_PLANS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createPaymentPlan = async (data: CreatePaymentPlanPayload): Promise<PaymentPlanType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.PAYMENT_PLANS_CREATE, data);
  return response.data;
};

export const updatePaymentPlan = async (id: string, data: PaymentPlanType): Promise<PaymentPlanType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.PAYMENT_PLANS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdatePaymentPlan = async (id: string, data: Partial<PaymentPlanType>): Promise<PaymentPlanType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.PAYMENT_PLANS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deletePaymentPlan = async (id: string): Promise<PaymentPlanType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.PAYMENT_PLANS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Subscription Functions ---
export const fetchSubscriptionsList = async (): Promise<SubscriptionType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.SUBSCRIPTIONS_LIST);
  return response.data;
};

export const fetchSubscriptionById = async (id: string): Promise<SubscriptionType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.SUBSCRIPTIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createSubscription = async (data: CreateSubscriptionPayload): Promise<SubscriptionType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.SUBSCRIPTIONS_CREATE, data);
  return response.data;
};

export const updateSubscription = async (id: string, data: SubscriptionType): Promise<SubscriptionType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.SUBSCRIPTIONS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateSubscription = async (id: string, data: Partial<SubscriptionType>): Promise<SubscriptionType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.SUBSCRIPTIONS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteSubscription = async (id: string): Promise<SubscriptionType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.SUBSCRIPTIONS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Invoice Functions ---
export const fetchInvoicesList = async (): Promise<InvoiceType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.INVOICES_LIST);
  return response.data;
};

export const fetchInvoiceById = async (id: string): Promise<InvoiceType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.INVOICES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createInvoice = async (data: CreateInvoicePayload): Promise<InvoiceType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.INVOICES_CREATE, data);
  return response.data;
};

export const updateInvoice = async (id: string, data: InvoiceType): Promise<InvoiceType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.INVOICES_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateInvoice = async (id: string, data: Partial<InvoiceType>): Promise<InvoiceType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.INVOICES_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteInvoice = async (id: string): Promise<InvoiceType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.INVOICES_DELETE.replace('{id}', id));
  return response.data;
};

// --- Refund Functions ---
export const fetchRefundsList = async (): Promise<RefundType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.REFUNDS_LIST);
  return response.data;
};

export const fetchRefundById = async (id: string): Promise<RefundType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.REFUNDS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createRefund = async (data: CreateRefundPayload): Promise<RefundType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.REFUNDS_CREATE, data);
  return response.data;
};

export const updateRefund = async (id: string, data: RefundType): Promise<RefundType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.REFUNDS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateRefund = async (id: string, data: Partial<RefundType>): Promise<RefundType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.REFUNDS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteRefund = async (id: string): Promise<RefundType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.REFUNDS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Payment Processing Functions ---
export const processPayment = async (data: ProcessPaymentPayload): Promise<PaymentType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.PROCESS_PAYMENT, data);
  return response.data;
};

export const verifyPayment = async (paymentId: string): Promise<PaymentType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.VERIFY_PAYMENT, { payment_id: paymentId });
  return response.data;
};

export const cancelPayment = async (paymentId: string): Promise<PaymentType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.CANCEL_PAYMENT, { payment_id: paymentId });
  return response.data;
};

// --- Webhook Functions ---
export const fetchWebhooksList = async (): Promise<WebhookType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.WEBHOOKS_LIST);
  return response.data;
};

export const fetchWebhookById = async (id: string): Promise<WebhookType> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.WEBHOOKS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createWebhook = async (data: CreateWebhookPayload): Promise<WebhookType> => {
  const response = await paymentServiceClient.post(PAYMENT_SERVICE_API.WEBHOOKS_CREATE, data);
  return response.data;
};

export const updateWebhook = async (id: string, data: WebhookType): Promise<WebhookType> => {
  const response = await paymentServiceClient.put(PAYMENT_SERVICE_API.WEBHOOKS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateWebhook = async (id: string, data: Partial<WebhookType>): Promise<WebhookType> => {
  const response = await paymentServiceClient.patch(PAYMENT_SERVICE_API.WEBHOOKS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteWebhook = async (id: string): Promise<WebhookType> => {
  const response = await paymentServiceClient.delete(PAYMENT_SERVICE_API.WEBHOOKS_DELETE.replace('{id}', id));
  return response.data;
};

// --- User Payment Functions ---
export const fetchUserPayments = async (userId: string): Promise<PaymentType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.USER_PAYMENTS.replace('{userId}', userId));
  return response.data;
};

export const fetchUserSubscriptions = async (userId: string): Promise<SubscriptionType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.USER_SUBSCRIPTIONS.replace('{userId}', userId));
  return response.data;
};

export const fetchUserInvoices = async (userId: string): Promise<InvoiceType[]> => {
  const response = await paymentServiceClient.get(PAYMENT_SERVICE_API.USER_INVOICES.replace('{userId}', userId));
  return response.data;
}; 