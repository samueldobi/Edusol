"use client";
import { useState } from "react";
import { NotificationType } from "../../src/api/services/notificationService";
import NotificationDetailsModal from "./notification-detail-modal";

export default function NotificationTable({
  notificationsData,
}: {
  notificationsData: NotificationType[];
}) {
  const [selectedNotification, setSelectedNotification] = useState<NotificationType | null>(null);

  function getTypeColor(type: string) {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  }

  function formatDate(dateString: string) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return 'Invalid date';
    }
  }

  function formatTime(dateString: string) {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Invalid time';
    }
  }

  const handleNotificationClick = (notification: NotificationType) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  // Ensure notificationsData is an array
  const notifications = Array.isArray(notificationsData) ? notificationsData : [];

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <div className="text-4xl mb-4">📭</div>
        <h3 className="text-lg font-medium mb-2">No notifications</h3>
        <p className="text-sm">You're all caught up!</p>
      </div>
    );
  }

  return (
    <>
      {notifications.map((item, index) => {
        // Debug: Log the raw item data
        console.log(`Notification ${index + 1} raw data:`, item);
        
        // Ensure item has required properties
        const notification = {
          id: item?.id || item?._id || `notification-${index}`,
          _id: item?._id,
          title: item?.title || item?.subject || 'No title',
          message: item?.message || item?.body || 'No message',
          type: item?.type || 'info',
          is_read: item?.is_read || false,
          created_at: item?.created_at || new Date().toISOString(),
          updated_at: item?.updated_at,
          recipient_id: item?.recipient_id || item?.receipient || '',
          sender_id: item?.sender_id,
          metadata: item?.metadata,
        };

        // Debug: Log the processed notification
        console.log(`Notification ${index + 1} processed:`, notification);

        return (
          <div
            key={notification.id}
            className={`flex items-start p-4 md:p-5 border-b border-gray-100 gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              !notification.is_read ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleNotificationClick(item)}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base flex-shrink-0">
              {getTypeIcon(notification.type)}
            </div>

            {/* Notification Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${getTypeColor(
                    notification.type
                  )}`}
                >
                  {notification.type}
                </span>
                <span className="font-semibold text-gray-800 text-sm">
                  {notification.title}
                </span>
                {!notification.is_read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>

              {/* Body Text */}
              <div className="text-gray-600 text-sm leading-relaxed">
                {notification.message}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-gray-400 text-xs mt-2">
                <span>{formatDate(notification.created_at)}</span>
                <span>{formatTime(notification.created_at)}</span>
                {notification.recipient_id && (
                  <span>To: {notification.recipient_id}</span>
                )}
              </div>
            </div>

            {/* Click indicator */}
            <div className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view details →
            </div>
          </div>
        );
      })}

      {/* Notification Detail Modal */}
      <NotificationDetailsModal
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </>
  );
}