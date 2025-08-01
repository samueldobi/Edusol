export const AUTH_API = {
  // Basic Authentication
  LOGIN: '/api/auth/signin/',
  REGISTER: '/api/auth/signup/',
  REFRESH_TOKEN: '/api/auth/refresh-token/',
  FORGOT_PASSWORD: '/api/auth/forgot-password/',
  RESET_PASSWORD: '/api/auth/reset-password/',
  VERIFY_EMAIL: '/api/auth/verify-email/',
  RESEND_VERIFICATION: '/api/auth/resend-verification/',
  CHANGE_PASSWORD: '/api/auth/change-password/',
  LOGOUT: '/api/auth/logout/',
  
  // User Management
  USERS: '/api/users/',
  USERS_BY_ID: '/api/users/{id}/',
  
  // Role Management
  ROLES: '/api/roles/',
  ROLES_BY_ID: '/api/roles/{id}/',
  
  // Permission Management
  PERMISSIONS: '/api/permissions/',
  PERMISSIONS_BY_ID: '/api/permissions/{id}/',
  
  // User Roles
  USER_ROLES: '/api/user-roles/',
  USER_ROLES_BY_ID: '/api/user-roles/{id}/',
  
  // Two-Factor Authentication
  TWO_FACTOR_ENABLE: '/api/auth/2fa/enable/',
  TWO_FACTOR_DISABLE: '/api/auth/2fa/disable/',
  TWO_FACTOR_VERIFY: '/api/auth/2fa/verify/',
  TWO_FACTOR_SETUP: '/api/auth/2fa/setup/',
};