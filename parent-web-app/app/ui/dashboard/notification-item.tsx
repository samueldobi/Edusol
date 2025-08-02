"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNotificationsList } from '../../src/api/services/notificationService';
import { NotificationType } from '../../src/api/services/notificationService';
import { getErrorMessage } from '../../src/utils/errorHandling';

const mockNotifications: NotificationType[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'Mathematics assignment has been posted for Class 10A',
    type: 'info',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_read: false
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Tuition fee payment has been successfully processed',
    type: 'success',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    is_read: true
  },
  {
    id: '3',
    title: 'Class Schedule Update',
    message: 'Class schedule has been updated for next week',
    type: 'warning',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    is_read: false
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight at 2 AM',
    type: 'error',
    created_at: new Date(Date.now() - 10800000).toISOString(),
    updated_at: new Date(Date.now() - 10800000).toISOString(),
    is_read: true
  }
];

export default function NotificationItemWrapper() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        setUseMockData(false);
        
        const data = await fetchNotificationsList();
        const notificationsArray = Array.isArray(data) ? data : [];
        
        if (notificationsArray.length > 0) {
          setNotifications(notificationsArray);
        } else {
          // Use mock data if no real notifications
          setNotifications(mockNotifications);
          setUseMockData(true);
        }
      } catch (error: any) {
        console.error('[NotificationItem] Failed to load notifications:', error);
        setError(getErrorMessage(error));
        // Use mock data as fallback only on error
        setNotifications(mockNotifications);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const handleNotificationClick = () => {
    router.push('/dashboard/notifications');
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-2 mb-2 w-full animate-pulse">
            <div className="flex-shrink-0 bg-gray-300 w-16 h-16 rounded-full"></div>
            <div className="flex flex-col w-full space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !useMockData) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 text-sm underline mt-2 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification, index) => {
        const uniqueKey = notification.id || notification._id || `notification-${index}`;
        
        return (
          <div
            key={uniqueKey}
            className="w-full cursor-pointer bg-white hover:bg-blue-50 rounded-lg transition-colors border border-gray-100"
            onClick={handleNotificationClick}
          >
            <div className="p-3">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    notification.type === 'error' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    <span className={`text-base sm:text-lg font-bold ${
                      notification.type === 'success' ? 'text-green-600' :
                      notification.type === 'warning' ? 'text-yellow-600' :
                      notification.type === 'error' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {notification.title?.charAt(0) || 'N'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header - Stack vertically on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {notification.title || 'Notification'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' :
                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        notification.type === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.type?.toUpperCase() || 'INFO'}
                      </span>
                      {!notification.is_read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.message || notification.body || 'No message available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NotificationItem({
  type,
  name,
  message,
  isRead = false,
  createdAt,
}: {
  type: string;
  name: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-green-100' :
          type === 'warning' ? 'bg-yellow-100' :
          type === 'error' ? 'bg-red-100' :
          'bg-blue-100'
        }`}>
          <span className={`text-lg font-bold ${
            type === 'success' ? 'text-green-600' :
            type === 'warning' ? 'text-yellow-600' :
            type === 'error' ? 'text-red-600' :
            'text-blue-600'
          }`}>
            {name.charAt(0)}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{message}</p>
        <div className="flex items-center justify-between mt-1">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
            {type.toUpperCase()}
          </span>
          {createdAt && (
            <span className="text-xs text-gray-400">{formatDate(createdAt)}</span>
          )}
        </div>
      </div>
      {!isRead && (
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      )}
    </div>
  );
}
