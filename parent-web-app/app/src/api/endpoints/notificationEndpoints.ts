export const NOTIFICATION_API = {
  // Notifications
  NOTIFICATIONS_LIST: '/api/notifications',
  NOTIFICATIONS_BY_ID: '/api/notifications/{id}',
  NOTIFICATIONS_CREATE: '/api/notifications',
  NOTIFICATIONS_UPDATE: '/api/notifications/{id}',
  NOTIFICATIONS_PARTIAL_UPDATE: '/api/notifications/{id}',
  NOTIFICATIONS_DELETE: '/api/notifications/{id}',
  
  // Notification Templates
  TEMPLATES_LIST: '/api/notification-templates',
  TEMPLATES_BY_ID: '/api/notification-templates/{id}',
  TEMPLATES_CREATE: '/api/notification-templates',
  TEMPLATES_UPDATE: '/api/notification-templates/{id}',
  TEMPLATES_PARTIAL_UPDATE: '/api/notification-templates/{id}',
  TEMPLATES_DELETE: '/api/notification-templates/{id}',
  
  // Notification Settings
  SETTINGS_LIST: '/api/notification-settings',
  SETTINGS_BY_ID: '/api/notification-settings/{id}',
  SETTINGS_CREATE: '/api/notification-settings',
  SETTINGS_UPDATE: '/api/notification-settings/{id}',
  SETTINGS_PARTIAL_UPDATE: '/api/notification-settings/{id}',
  SETTINGS_DELETE: '/api/notification-settings/{id}',
  
  // Send Notifications
  SEND_NOTIFICATION: '/api/notifications/send',
  SEND_BULK_NOTIFICATION: '/api/notifications/send-bulk',
  
  // Mark as Read/Unread
  MARK_AS_READ: '/api/notifications/{id}/mark-read',
  MARK_AS_UNREAD: '/api/notifications/{id}/mark-unread',
  MARK_ALL_AS_READ: '/api/notifications/mark-all-read',
  
  // User Notifications
  USER_NOTIFICATIONS: '/api/notifications/user/{userId}',
  USER_NOTIFICATIONS_UNREAD: '/api/notifications/user/{userId}/unread',
}; 