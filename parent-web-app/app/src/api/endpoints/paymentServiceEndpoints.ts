export const PAYMENT_SERVICE_API = {
  // Payments
  PAYMENTS_CREATE: '/api/payment/payments',
  PAYMENTS_LIST: '/api/payments/transactions',
  // Get payment for current user, guardian only
  PAYMENT_BY_GUARDIAN: '/api/payment/payments/users/guardian',
  // Get payments for a specific school (School only)
  PAYMENT_BY_SCHOOL: '/api/payment/payments/users/school',
  PAYMENTS_BY_USER: '/api/payment/transactions/account/user',
  PAYMENTS_SINGLE: '/api/payments/payment/{id}',
  
  
  // Payment Accounts
  // payment acounts(admin only)
  PAYMENTS_ACCOUNTS: '/api/payment/accounts/',
  // Get user's virtual account (Guardian only)
  PAYMENTS_USER_ACCOUNT:'/api/payment/accounts/user',
  
  //  Payment Transactions
  // Admin only 
  PAYMENT_TRANSACTIONS: '/api/payment/transactions',
  // GUARDIAN ONLY
  PAYMENT_TRANSACTION_FOR_USER: '/api/payment/transactions/account/user',
  // Webhook endpoint for transaction notifications
  PAYMENT_NOTIFICATION_WEBHOOK: '/api/payment/transactions/webhook',
  // payment transaction by id
  PAYMENT_TRANSACTION_BY_ID: '/api/payment/transactions/{id}',
  
  
  // Payment School accounts 
  PAYMENT_SCHOOL_ACCOUNT: '/api/payment/school_accounts',
  PAYMENT_UPDATE_SCHOOL_ACCOUNT: '/api/payment/school_accounts/{id}',
}; 