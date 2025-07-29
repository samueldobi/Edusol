export const PAYMENT_SERVICE_API = {
  // Payment Transactions
  PAYMENTS_LIST: '/api/payments',
  PAYMENTS_BY_ID: '/api/payments/{id}',
  PAYMENTS_CREATE: '/api/payments',
  PAYMENTS_UPDATE: '/api/payments/{id}',
  PAYMENTS_PARTIAL_UPDATE: '/api/payments/{id}',
  PAYMENTS_DELETE: '/api/payments/{id}',
  
  // Payment Methods
  PAYMENT_METHODS_LIST: '/api/payment-methods',
  PAYMENT_METHODS_BY_ID: '/api/payment-methods/{id}',
  PAYMENT_METHODS_CREATE: '/api/payment-methods',
  PAYMENT_METHODS_UPDATE: '/api/payment-methods/{id}',
  PAYMENT_METHODS_PARTIAL_UPDATE: '/api/payment-methods/{id}',
  PAYMENT_METHODS_DELETE: '/api/payment-methods/{id}',
  
  // Payment Plans
  PAYMENT_PLANS_LIST: '/api/payment-plans',
  PAYMENT_PLANS_BY_ID: '/api/payment-plans/{id}',
  PAYMENT_PLANS_CREATE: '/api/payment-plans',
  PAYMENT_PLANS_UPDATE: '/api/payment-plans/{id}',
  PAYMENT_PLANS_PARTIAL_UPDATE: '/api/payment-plans/{id}',
  PAYMENT_PLANS_DELETE: '/api/payment-plans/{id}',
  
  // Payment Subscriptions
  SUBSCRIPTIONS_LIST: '/api/subscriptions',
  SUBSCRIPTIONS_BY_ID: '/api/subscriptions/{id}',
  SUBSCRIPTIONS_CREATE: '/api/subscriptions',
  SUBSCRIPTIONS_UPDATE: '/api/subscriptions/{id}',
  SUBSCRIPTIONS_PARTIAL_UPDATE: '/api/subscriptions/{id}',
  SUBSCRIPTIONS_DELETE: '/api/subscriptions/{id}',
  
  // Payment Invoices
  INVOICES_LIST: '/api/invoices',
  INVOICES_BY_ID: '/api/invoices/{id}',
  INVOICES_CREATE: '/api/invoices',
  INVOICES_UPDATE: '/api/invoices/{id}',
  INVOICES_PARTIAL_UPDATE: '/api/invoices/{id}',
  INVOICES_DELETE: '/api/invoices/{id}',
  
  // Payment Refunds
  REFUNDS_LIST: '/api/refunds',
  REFUNDS_BY_ID: '/api/refunds/{id}',
  REFUNDS_CREATE: '/api/refunds',
  REFUNDS_UPDATE: '/api/refunds/{id}',
  REFUNDS_PARTIAL_UPDATE: '/api/refunds/{id}',
  REFUNDS_DELETE: '/api/refunds/{id}',
  
  // Payment Processing
  PROCESS_PAYMENT: '/api/payments/process',
  VERIFY_PAYMENT: '/api/payments/verify',
  CANCEL_PAYMENT: '/api/payments/cancel',
  
  // Payment Webhooks
  WEBHOOKS_LIST: '/api/webhooks',
  WEBHOOKS_BY_ID: '/api/webhooks/{id}',
  WEBHOOKS_CREATE: '/api/webhooks',
  WEBHOOKS_UPDATE: '/api/webhooks/{id}',
  WEBHOOKS_PARTIAL_UPDATE: '/api/webhooks/{id}',
  WEBHOOKS_DELETE: '/api/webhooks/{id}',
  
  // Payment Reports
  PAYMENT_REPORTS: '/api/payments/reports',
  TRANSACTION_HISTORY: '/api/payments/transactions',
  REVENUE_REPORTS: '/api/payments/revenue',
  
  // User Payments
  USER_PAYMENTS: '/api/payments/user/{userId}',
  USER_SUBSCRIPTIONS: '/api/subscriptions/user/{userId}',
  USER_INVOICES: '/api/invoices/user/{userId}',
}; 