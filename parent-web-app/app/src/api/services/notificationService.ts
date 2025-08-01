import { notificationClient } from '../clients/notificationClient';
import { NOTIFICATION_API } from '../endpoints/notificationEndpoints';

// --- Types ---
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
  metadata?: Record<string, any>;
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
  variables?: Record<string, any>;
}

export interface EmailBulkNotificationPayload {
  recipients: string[];
  subject: string;
  message: string;
  template_id?: string;
  variables?: Record<string, any>;
}

export interface PushNotificationPayload {
  title: string;
  message: string;
  recipient_ids: string[];
  data?: Record<string, any>;
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

export interface CreateNotificationTagPayload {
  name: string;
  description?: string;
  color?: string;
}

// --- Environment Check ---
export const checkEnvironment = (): void => {
  console.log('🔧 Environment check:');
  console.log('   NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
  console.log('   NODE_ENV:', process.env.NODE_ENV);
  console.log('   Window object available:', typeof window !== 'undefined');
  
  if (typeof window !== 'undefined') {
    console.log('   Token in localStorage:', !!localStorage.getItem('token'));
    console.log('   Refresh token in localStorage:', !!localStorage.getItem('refreshToken'));
  }
};

// --- Helper Functions ---
const getSchoolContext = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return {
          schoolId: user.schoolId || user.school_id,
          userId: user.id,
          userRole: user.role
        };
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }
  return null;
};

// --- Notification Functions ---
export const fetchNotificationsList = async (): Promise<NotificationType[]> => {
  try {
    // console.log('[fetchNotificationsList] Fetching notifications...');
    // console.log('[fetchNotificationsList] Endpoint:', NOTIFICATION_API.NOTIFICATIONS_LIST);
    
    // Get school context for parameters
    const schoolContext = getSchoolContext();
    // console.log('[fetchNotificationsList] School context:', schoolContext);
    
    // Add query parameters including pagination
    const params: any = {
      page: 1,
      per_page: 100, // Get more notifications per page
      limit: 100     // Alternative parameter name
    };
    
    if (schoolContext?.schoolId) {
      params.schoolId = schoolContext.schoolId;
    }
    if (schoolContext?.userId) {
      params.userId = schoolContext.userId;
    }
    
    // console.log('[fetchNotificationsList] Request params:', params);
    
    const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_LIST, { params });
    // console.log('[fetchNotificationsList] Full response:', response);
    // console.log('[fetchNotificationsList] Response data:', response.data);
    // console.log('[fetchNotificationsList] Response data keys:', Object.keys(response.data));
    
    // Handle different response structures
    let notificationsData: NotificationType[] = [];
    
    if (Array.isArray(response.data)) {
      notificationsData = response.data;
    } else if (response.data && typeof response.data === 'object') {
      if (Array.isArray(response.data.data)) {
        notificationsData = response.data.data;
      } else if (Array.isArray(response.data.notifications)) {
        notificationsData = response.data.notifications;
      } else if (Array.isArray(response.data.results)) {
        notificationsData = response.data.results;
      } else {
        // console.warn('[fetchNotificationsList] Unexpected response structure:', response.data);
        notificationsData = [];
      }
    }
    
    // console.log('[fetchNotificationsList] Extracted notifications:', notificationsData);
    // console.log('[fetchNotificationsList] Number of notifications:', notificationsData.length);
    
    // Log each notification for debugging
    notificationsData.forEach((notification, index) => {
      console.log(`[fetchNotificationsList] Notification ${index + 1}:`, {
        id: notification.id || notification._id,
        title: notification.title || notification.subject,
        message: notification.message || notification.body,
        type: notification.type,
        recipient: notification.recipient_id || notification.receipient,
        created_at: notification.created_at
      });
    });
    
    return notificationsData;
  } catch (error: any) {
    console.error('[fetchNotificationsList] Error fetching notifications:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.config?.headers
    });
    throw error;
  }
};

export const fetchNotificationById = async (id: string): Promise<NotificationType> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createNotification = async (data: SendNotificationPayload & { tag?: string }): Promise<NotificationType> => {
  try {
    // Validate required fields
    if (!data.title || !data.message || !data.recipient_id) {
      throw new Error('Missing required fields: title, message, or recipient_id');
    }

    if (!data.tag) {
      throw new Error('Missing required field: tag ID');
    }

    
    const payload = {
      //  tag ID from createTagAndReturnId
      tag: data.tag, 
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
      type: data.type, 
    };
    
    console.log('[createNotification] Input data:', data);
    console.log('[createNotification] Sending payload to backend:', payload);
    console.log('[createNotification] Payload JSON:', JSON.stringify(payload, null, 2));
    console.log('[createNotification] Endpoint:', NOTIFICATION_API.NOTIFICATIONS_CREATE);
    
    const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATIONS_CREATE, payload);
    console.log('[createNotification] Backend response:', response.data);
    console.log('[createNotification] Response type field:', response.data?.type);
    
    return response.data;
  } catch (error: any) {
    console.error('[createNotification] Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
    });
    
    
    throw new Error(`Failed to create notification: ${error.response?.data?.message || error.message}`);
  }
};

export const partialUpdateNotification = async (id: string, data: Partial<NotificationType>): Promise<NotificationType> => {
  try {
    console.log('[partialUpdateNotification] Updating notification:', { id, data });
    

    const backendPayload: any = {};
    

    if (data.title !== undefined) {
      backendPayload.subject = data.title;
    }
    if (data.message !== undefined) {
      backendPayload.body = data.message;
    }
    if (data.recipient_id !== undefined) {
      backendPayload.receipient = data.recipient_id;
    }
    if (data.type !== undefined) {
      backendPayload.type = data.type;
    }
    
    console.log('[partialUpdateNotification] Backend payload:', backendPayload);
    
    const response = await notificationClient.patch(NOTIFICATION_API.NOTIFICATIONS_PARTIAL_UPDATE.replace('{id}', id), backendPayload);
    console.log('[partialUpdateNotification] Update successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[partialUpdateNotification] Error updating notification:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    throw new Error(`Failed to update notification: ${error.response?.data?.message || error.message}`);
  }
};

export const deleteNotification = async (id: string): Promise<NotificationType> => {
  try {
    console.log('[deleteNotification] Deleting notification:', { id });
    const response = await notificationClient.delete(NOTIFICATION_API.NOTIFICATIONS_DELETE.replace('{id}', id));
    console.log('[deleteNotification] Delete successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('[deleteNotification] Error deleting notification:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    throw new Error(`Failed to delete notification: ${error.response?.data?.message || error.message}`);
  }
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

// --- Tag Functions ---
export const fetchTagsList = async (): Promise<NotificationTagType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATION_TAGS);
  return response.data;
};

export const fetchTagById = async (id: string): Promise<NotificationTagType> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATION_TAGS_BY_ID.replace('{id}', id));
  return response.data;
};

export const createTagAndReturnId = async (name: string, color: string): Promise<string> => {
  try {
    const payload = { name, color };
    console.log('[createTagAndReturnId] Creating tag with payload:', payload);
    
    const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATION_TAGS, payload);
    console.log('[createTagAndReturnId] Tag creation response:', response.data);
    
    // The backend only returns success message, not the tag data
    // So we need to fetch the tags list and find the newly created tag
    if (response.data.success) {
      console.log('[createTagAndReturnId] Tag created successfully, fetching tags list...');
      
      // Fetch the tags list to find the newly created tag
      const tagsResponse = await notificationClient.get(NOTIFICATION_API.NOTIFICATION_TAGS);
      console.log('[createTagAndReturnId] Tags list response:', tagsResponse.data);
      
      if (tagsResponse.data.success && tagsResponse.data.data) {
        const tags = tagsResponse.data.data;
        console.log('[createTagAndReturnId] Available tags:', tags);
        
        // Find the tag by name (case-insensitive)
        const createdTag = tags.find((tag: any) => 
          tag.name.toLowerCase() === name.toLowerCase()
        );
        
        if (createdTag && createdTag._id) {
          console.log('[createTagAndReturnId] Found created tag:', createdTag);
          return createdTag._id;
        } else {
          console.error('[createTagAndReturnId] Tag not found in list after creation');
          throw new Error('Tag created but could not find it in the tags list');
        }
      } else {
        console.error('[createTagAndReturnId] Failed to fetch tags list');
        throw new Error('Failed to fetch tags list after creation');
      }
    } else {
      throw new Error('Tag creation failed');
    }
  } catch (error: any) {
    console.error('[createTagAndReturnId] Error creating tag:', error.response?.data || error.message);
    throw new Error(`Failed to create tag: ${error.response?.data?.message || error.message}`);
  }
};

export const partialUpdateTag = async (id: string, data: Partial<NotificationTagType>): Promise<NotificationTagType> => {
  const response = await notificationClient.patch(NOTIFICATION_API.NOTIFICATION_TAGS_PARTIAL_UPDATE.replace('{id}', id), data);
  return response.data;
};

export const deleteTag = async (id: string): Promise<NotificationTagType> => {
  const response = await notificationClient.delete(NOTIFICATION_API.NOTIFICATION_TAGS_DELETE.replace('{id}', id));
  return response.data;
};

// --- Email Functions ---
export const sendEmailNotification = async (data: EmailNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.EMAIL_NOTIFICATIONS_SINGLE, data);
  return response.data;
};

export const sendBulkEmailNotification = async (data: EmailBulkNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.EMAIL_NOTIFICATIONS_MULTIPLE, data);
  return response.data;
};

// --- Push Notification Functions ---
export const sendPushNotification = async (data: PushNotificationPayload): Promise<{ message: string }> => {
  const response = await notificationClient.post(NOTIFICATION_API.PUSH_NOTIFICATIONS, data);
  return response.data;
}; 