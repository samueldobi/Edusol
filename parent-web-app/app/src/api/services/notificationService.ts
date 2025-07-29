import { notificationClient } from '../clients/notificationClient';
import { NOTIFICATION_API } from '../endpoints/notificationEndpoints';

// --- Types ---
export interface NotificationType {
  id: string;
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

// --- API Connection Test ---
export const testAPIConnection = async (): Promise<any> => {
  console.log('🌐 Testing API connection...');
  
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log('📍 Base URL:', baseURL);
  console.log('📍 Full endpoint:', `${baseURL}${NOTIFICATION_API.NOTIFICATIONS_CREATE}`);
  
  try {
    // Test with a simple GET request to the list endpoint
    const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_LIST);
    console.log('✅ API connection successful:', response.status);
    return response.data;
  } catch (error: any) {
    console.log('❌ API connection failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    throw error;
  }
};

// --- My Test Function for Debugging ---
export const testNotificationCreation = async (data: SendNotificationPayload): Promise<any> => {
  console.log(' Testing notification creation with different payloads...');
  
  // First, check authentication status
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
  console.log('🔐 Authentication check:');
  console.log('   Token exists:', !!token);
  console.log('   Refresh token exists:', !!refreshToken);
  console.log('   Token preview:', token ? `${token.substring(0, 20)}...` : 'NONE');
  
  // Test GET request first to check if the endpoint is accessible
  try {
    console.log('🔍 Testing endpoint availability...');
    const testResponse = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_LIST);
    console.log('✅ Endpoint is accessible:', testResponse.status);
  } catch (error: any) {
    console.log('❌ Endpoint test failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
  }
  
  const testPayloads = [
    // Test 1: Minimal payload
    {
      tag: "General",
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
    },
    // Test 2: With type
    {
      tag: "General",
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
      type: data.type,
    },
    // Test 3: With timestamps
    {
      tag: "General",
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    // Test 4: Full payload
    {
      tag: data.metadata?.tag || "General",
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
      type: data.type,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  for (let i = 0; i < testPayloads.length; i++) {
    const payload = testPayloads[i];
    console.log(`🧪 Test ${i + 1}:`, payload);
    
    try {
      // Log the full request details
      console.log(`📤 Sending request to: ${NOTIFICATION_API.NOTIFICATIONS_CREATE}`);
      console.log(`📤 Method: POST`);
      console.log(`📤 Headers:`, {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : 'None',
        'x-refresh-token': refreshToken || 'None'
      });
      
      const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATIONS_CREATE, payload);
      console.log(`✅ Test ${i + 1} SUCCESS:`, response.data);
      return response.data;
    } catch (error: any) {
      console.log(`❌ Test ${i + 1} FAILED:`, {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      
      // If we get a 401/403, stop testing as it's an auth issue
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('🔑 Authentication error detected, stopping tests');
        throw new Error('Authentication failed. Please check your login status.');
      }
    }
  }
  
  throw new Error('All test payloads failed with 500 errors. This suggests a backend issue.');
};

// --- Notification Functions ---
export const fetchNotificationsList = async (): Promise<NotificationType[]> => {
  const response = await notificationClient.get(NOTIFICATION_API.NOTIFICATIONS_LIST);
  return response.data;
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

    // Create the payload with the tag ID
    const payload = {
      tag: data.tag, // This should be the tag ID from createTagAndReturnId
      subject: data.title.trim(),
      receipient: data.recipient_id.trim(),
      body: data.message.trim(),
    };
    
    console.log('[createNotification] Sending payload to backend:', payload);
    console.log('[createNotification] Payload JSON:', JSON.stringify(payload, null, 2));
    console.log('[createNotification] Endpoint:', NOTIFICATION_API.NOTIFICATIONS_CREATE);
    
    const response = await notificationClient.post(NOTIFICATION_API.NOTIFICATIONS_CREATE, payload);
    console.log('[createNotification] Backend response:', response);
    
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
    
    // Re-throw with more context
    throw new Error(`Failed to create notification: ${error.response?.data?.message || error.message}`);
  }
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