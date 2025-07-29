export const AUTH_SERVICE_API = {
  // User Management
  USERS_LIST: '/api/users',
  USERS_BY_ID: '/api/users/{id}',
  USERS_CREATE: '/api/users',
  USERS_UPDATE: '/api/users/{id}',
  USERS_PARTIAL_UPDATE: '/api/users/{id}',
  USERS_DELETE: '/api/users/{id}',
  
  // Role Management
  ROLES_LIST: '/api/roles',
  ROLES_BY_ID: '/api/roles/{id}',
  ROLES_CREATE: '/api/roles',
  ROLES_UPDATE: '/api/roles/{id}',
  ROLES_PARTIAL_UPDATE: '/api/roles/{id}',
  ROLES_DELETE: '/api/roles/{id}',
  
  // Permission Management
  PERMISSIONS_LIST: '/api/permissions',
  PERMISSIONS_BY_ID: '/api/permissions/{id}',
  PERMISSIONS_CREATE: '/api/permissions',
  PERMISSIONS_UPDATE: '/api/permissions/{id}',
  PERMISSIONS_PARTIAL_UPDATE: '/api/permissions/{id}',
  PERMISSIONS_DELETE: '/api/permissions/{id}',
  
  // User Roles
  USER_ROLES_LIST: '/api/user-roles',
  USER_ROLES_BY_ID: '/api/user-roles/{id}',
  USER_ROLES_CREATE: '/api/user-roles',
  USER_ROLES_UPDATE: '/api/user-roles/{id}',
  USER_ROLES_PARTIAL_UPDATE: '/api/user-roles/{id}',
  USER_ROLES_DELETE: '/api/user-roles/{id}',
  
  // Profile Management
  PROFILE_GET: '/api/profile',
  PROFILE_UPDATE: '/api/profile',
  PROFILE_PARTIAL_UPDATE: '/api/profile',
  
  // Password Management
  CHANGE_PASSWORD: '/api/auth/change-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  
  // Email Verification
  VERIFY_EMAIL: '/api/auth/verify-email',
  RESEND_VERIFICATION: '/api/auth/resend-verification',
  
  // Session Management
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  
  // Two-Factor Authentication
  TWO_FACTOR_ENABLE: '/api/auth/2fa/enable',
  TWO_FACTOR_DISABLE: '/api/auth/2fa/disable',
  TWO_FACTOR_VERIFY: '/api/auth/2fa/verify',
  TWO_FACTOR_SETUP: '/api/auth/2fa/setup',
}; 