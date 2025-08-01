export const PAYMENT_SERVICE_API = {
  // Payments
  PAYMENTS: '/api/payment/payments/',
  TRANSACTIONS: '/api/payments/transactions/',
  PAYMENT_BY_GUARDIAN: '/api/payment/payments/users/guardian/',
  PAYMENT_BY_SCHOOL: '/api/payment/payments/users/school/',
  PAYMENTS_BY_USER: '/api/payment/transactions/account/user/',
  PAYMENT_BY_ID: '/api/payments/payment/{id}/',
  
  // Payment Accounts
  ACCOUNTS: '/api/payment/accounts/',
  USER_ACCOUNT: '/api/payment/accounts/user/',
  
  // Payment Transactions
  PAYMENT_TRANSACTIONS: '/api/payment/transactions/',
  TRANSACTION_FOR_USER: '/api/payment/transactions/account/user/',
  NOTIFICATION_WEBHOOK: '/api/payment/transactions/webhook/',
  TRANSACTION_BY_ID: '/api/payment/transactions/{id}/',
  
  // Payment School accounts 
  SCHOOL_ACCOUNT: '/api/payment/school_accounts/',
  SCHOOL_ACCOUNT_BY_ID: '/api/payment/school_accounts/{id}/',
}; 