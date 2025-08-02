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
        const notification = {
          id: item.id || item._id || `notification-${index}`,
          title: item.title || item.subject || `Notification ${index + 1}`,
          message: item.message || item.body || 'No message available',
          type: item.type || 'info',
          is_read: item.is_read || false,
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString(),
          recipient_id: item.recipient_id,
        };

        return (
        
          <div
  key={notification.id}
  className={`flex items-start p-4 md:p-5 border-b border-gray-100 gap-4 hover:bg-gray-50 transition-colors cursor-pointer w-full min-w-0 ${
    !notification.is_read ? 'bg-[#fff]' : ''
  }`}
  onClick={() => handleNotificationClick(item)}
>
  <div className="w-9 h-9 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base flex-shrink-0">
    {getTypeIcon(notification.type)}
  </div>

  <div className="flex-1 min-w-0 w-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1 w-full min-w-0">
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${getTypeColor(
          notification.type
        )}`}
      >
        {notification.type}
      </span>
      <span className="font-semibold text-gray-800 text-sm min-w-0 break-words">
        {notification.title}
      </span>
      {!notification.is_read && (
        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
      )}
    </div>

    <div className="text-gray-600 text-sm leading-relaxed min-w-0 break-words whitespace-normal">
      {notification.message}
    </div>

    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs mt-2 min-w-0">
      <span className="flex-shrink-0">{formatDate(notification.created_at)}</span>
      <span className="flex-shrink-0">{formatTime(notification.created_at)}</span>
      {notification.recipient_id && (
        <span className="min-w-0 break-words">To: {notification.recipient_id}</span>
      )}
    </div>
  </div>

  <div className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hidden sm:block">
    Click to view details →
  </div>
</div>
        );
      })}

      <NotificationDetailsModal
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </>
  );
}