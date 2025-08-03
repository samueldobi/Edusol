import { notificationClient } from '../clients/notificationClient';
import { NOTIFICATION_API } from '../endpoints/notificationEndpoints';

export interface NotificationType {
  id?: string;
  _id?: string;
  title?: string;        
  subject?: string;      
  message?: string;      
  body?: string;         
  type: 'info' | 'success' | 'warning' | 'error';
  recipient_id?: string; 
  receipient?: string;   
  sender_id?: string;
  is_read?: boolean;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
  tag?: string;          
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

export interface NotificationTagType {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailNotificationPayload {
  to: string;
  subject: string;
  message: string;
  template_id?: string;
  variables?: Record<string, unknown>;
}

export interface EmailBulkNotificationPayload {
  recipients: string[];
  subject: string;
  message: string;
  template_id?: string;
  variables?: Record<string, unknown>;
}

export interface PushNotificationPayload {
  title: string;
  message: string;
  recipient_ids: string[];
  data?: Record<string, unknown>;
}

export interface SendNotificationPayload {
  title: string;        
  message: string;      
  type: 'info' | 'success' | 'warning' | 'error';
  recipient_id: string; 
  sender_id?: string;
  metadata?: Record<string, unknown>; 
}

export interface CreateNotificationTemplatePayload {
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  variables: string[];
}

export interface CreateNotificationTagPayload {
  name: string;
  description?: string;
  color?: string;
}

const getSchoolContext = () => {
  if (typeof window === 'undefined') {
    return { schoolId: null, userId: null };
  }

  const schoolId = localStorage.getItem('schoolId');
  const userId = localStorage.getItem('userId');

  return {
    schoolId,
    userId,
  };
};

export const fetchNotificationsList = async (): Promise<NotificationType[]> => {
  try {
    const schoolContext = getSchoolContext();
    
    const params: Record<string, unknown> = {
      page: 1,
      limit: 100
    };
    
    if (schoolContext?.schoolId) {
      params.schoolId = schoolContext.schoolId;
    }
    if (schoolContext?.userId) {
      params.userId = schoolContext.userId;
    }
    
    const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS, { params });
    
    let notificationsData: NotificationType[] = [];
    
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      notificationsData = response.data.data;
    } else {
      notificationsData = [];
    }
    
    return notificationsData;
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchNotificationById = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createNotification = async (data: SendNotificationPayload & { tag?: string }): Promise<NotificationType> => {
  try {
    const payload = {
      title: data.title,
      message: data.message,
      type: data.type,
      recipient_id: data.recipient_id,
      sender_id: data.sender_id,
      metadata: data.metadata,
      tag: data.tag,
    };

    const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATIONS, payload);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const partialUpdateNotification = async (id: string, data: Partial<NotificationType>): Promise<NotificationType> => {
  try {
    const response = await notificationClient.patch(
      NOTIFICATION_API.NOTIFICATIONS_BY_ID.replace('{id}', id),
      data
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteNotification = async (id: string): Promise<NotificationType> => {
  try {
    const response = await notificationClient.delete(NOTIFICATION_API.NOTIFICATIONS_BY_ID.replace('{id}', id));
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchTemplatesList = async (): Promise<NotificationTemplateType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.TEMPLATES);
  return response.data;
};

export const fetchTemplateById = async (id: string): Promise<NotificationTemplateType> => {
  const response = await notificationClient.get(NOTIFICATION_API.TEMPLATES_BY_ID.replace('{id}', id));
  return response.data;
};

export const createTemplate = async (data: CreateNotificationTemplatePayload): Promise<NotificationTemplateType> => {
  const response = await notificationClient.post(NOTIFICATION_API.TEMPLATES, data);
  return response.data;
};

export const updateTemplate = async (id: string, data: NotificationTemplateType): Promise<NotificationTemplateType> => {
  const response = await notificationClient.put(NOTIFICATION_API.TEMPLATES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateTemplate = async (id: string, data: Partial<NotificationTemplateType>): Promise<NotificationTemplateType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.TEMPLATES_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteTemplate = async (id: string): Promise<NotificationTemplateType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.TEMPLATES_BY_ID.replace('{id}', id));
  return response.data;
};

export const fetchTagsList = async (): Promise<NotificationTagType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.TAGS);
  return response.data;
};

export const fetchTagById = async (id: string): Promise<NotificationTagType> => {
  const response = await notificationClient.get(NOTIFICATION_API.TAGS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createTagAndReturnId = async (name: string, color: string): Promise<string> => {
  try {
    const payload = {
      name,
      color,
    };

    const response = await notificationClient.post(NOTIFICATION_API.TAGS, payload);
    return response.data.id;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateTag = async (id: string, data: NotificationTagType): Promise<NotificationTagType> => {
  const response = await notificationClient.put(NOTIFICATION_API.TAGS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const partialUpdateTag = async (id: string, data: Partial<NotificationTagType>): Promise<NotificationTagType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.TAGS_BY_ID.replace('{id}', id), data);
  return response.data;
};

export const deleteTag = async (id: string): Promise<NotificationTagType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.TAGS_BY_ID.replace('{id}', id));
  return response.data;
};

export const sendEmailNotification = async (data: EmailNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.EMAIL_SINGLE, data);
  return response.data;
};

export const sendBulkEmailNotification = async (data: EmailBulkNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.EMAIL_MULTIPLE, data);
  return response.data;
};

export const sendPushNotification = async (data: PushNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.PUSH, data);
  return response.data;
}; 