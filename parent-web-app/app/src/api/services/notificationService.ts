import { notificationClient } from '../clients/notificationClient';
import { NOTIFICATION_API } from '../endpoints/notificationEndpoints';

// --- Types ---
export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipient_id: string;
  sender_id?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface NotificationTemplateType {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  variables: string[];
  created_at: string;
  updated_at: string;
}

export interface NotificationSettingType {
  id: string;
  user_id: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface SendNotificationPayload {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipient_id: string;
  sender_id?: string;
  metadata?: Record<string, any>;
}

export interface CreateNotificationTemplatePayload {
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  variables: string[];
}

export interface CreateNotificationSettingPayload {
  user_id: string;
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;
}

// --- Notification Functions ---
export const fetchNotificationsList = async (): Promise<NotificationType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_LIST);
  return response.data;
};

export const fetchNotificationById = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createNotification = async (data: SendNotificationPayload): Promise<NotificationType> => {
  const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATIONS_CREATE, data);
  return response.data;
};

export const updateNotification = async (id: string, data: NotificationType): Promise<NotificationType> => {
  const response = await notificationClient.put(NOTIFICATION_API.NOTIFICATIONS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateNotification = async (id: string, data: Partial<NotificationType>): Promise<NotificationType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.NOTIFICATIONS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteNotification = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.NOTIFICATIONS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Template Functions ---
export const fetchTemplatesList = async (): Promise<NotificationTemplateType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.TEMPLATES_LIST);
  return response.data;
};

export const fetchTemplateById = async (id: string): Promise<NotificationTemplateType> => {
  const response = await notificationClient.get(NOTIFICATION_API.TEMPLATES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createTemplate = async (data: CreateNotificationTemplatePayload): Promise<NotificationTemplateType> => {
  const response = await notificationClient.post(NOTIFICATION_API.TEMPLATES_CREATE, data);
  return response.data;
};

export const updateTemplate = async (id: string, data: NotificationTemplateType): Promise<NotificationTemplateType> => {
  const response = await notificationClient.put(NOTIFICATION_API.TEMPLATES_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateTemplate = async (id: string, data: Partial<NotificationTemplateType>): Promise<NotificationTemplateType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.TEMPLATES_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteTemplate = async (id: string): Promise<NotificationTemplateType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.TEMPLATES_DELETE.replace('{id}', id));
  return response.data;
};

// --- Settings Functions ---
export const fetchSettingsList = async (): Promise<NotificationSettingType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.SETTINGS_LIST);
  return response.data;
};

export const fetchSettingById = async (id: string): Promise<NotificationSettingType> => {
  const response = await notificationClient.get(NOTIFICATION_API.SETTINGS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createSetting = async (data: CreateNotificationSettingPayload): Promise<NotificationSettingType> => {
  const response = await notificationClient.post(NOTIFICATION_API.SETTINGS_CREATE, data);
  return response.data;
};

export const updateSetting = async (id: string, data: NotificationSettingType): Promise<NotificationSettingType> => {
  const response = await notificationClient.put(NOTIFICATION_API.SETTINGS_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateSetting = async (id: string, data: Partial<NotificationSettingType>): Promise<NotificationSettingType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.SETTINGS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteSetting = async (id: string): Promise<NotificationSettingType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.SETTINGS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Send Functions ---
export const sendNotification = async (data: SendNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.SEND_NOTIFICATION, data);
  return response.data;
};

export const sendBulkNotification = async (data: { notifications: SendNotificationPayload[] }): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.SEND_BULK_NOTIFICATION, data);
  return response.data;
};

// --- Mark as Read/Unread Functions ---
export const markAsRead = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.post(NOTIFICATION_API.MARK_AS_READ.replace('{id}', id));
  return response.data;
};

export const markAsUnread = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.post(NOTIFICATION_API.MARK_AS_UNREAD.replace('{id}', id));
  return response.data;
};

export const markAllAsRead = async (): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.MARK_ALL_AS_READ);
  return response.data;
};

// --- User Notification Functions ---
export const fetchUserNotifications = async (userId: string): Promise<NotificationType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.USER_NOTIFICATIONS.replace('{userId}', userId));
  return response.data;
};

export const fetchUserUnreadNotifications = async (userId: string): Promise<NotificationType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.USER_NOTIFICATIONS_UNREAD.replace('{userId}', userId));
  return response.data;
}; 