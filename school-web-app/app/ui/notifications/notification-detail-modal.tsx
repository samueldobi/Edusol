"use client";
import React from 'react';
import { NotificationType } from "../../src/api/services/notificationService";

interface NotificationDetailsModalProps {
  notification: NotificationType | null;
  onClose: () => void;
}

const NotificationDetailsModal = ({ notification, onClose }: NotificationDetailsModalProps) => {
  if (!notification) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return 'Invalid date';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    } catch {
      return 'Unknown time';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Safe property extraction with fallbacks
  const itemTitle = notification.title || notification.subject || 'No Title';
  const itemMessage = notification.message || notification.body || 'No Message';
  const itemRecipient = notification.recipient_id || notification.receipient || 'All';
  const notificationType = notification.type || 'info';
  const isRead = notification.is_read || false;
  const createdAt = notification.created_at || new Date().toISOString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-w-3xl w-full bg-white border-2 border-green-500 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header Buttons */}
        <div className="flex justify-end gap-3 p-4 pb-0">
          {/* <button 
            onClick={onClose}
            className="bg-gray-100 text-gray-500 border border-gray-500 font-semibold rounded-md px-5 py-2 hover:bg-gray-200"
          >
            CLOSE
          </button> */}
        </div>

        {/* Title */}
        <h2 className="text-green-500 font-bold text-2xl md:text-3xl mt-4 ml-6">Notification Details</h2>

        {/* Main Content */}
        <div className="px-6 pb-6">
          {/* Type Badge and Result */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 mb-3">
            <div className="bg-blue-100 border-2 border-blue-600 rounded-lg flex items-center justify-center w-full md:w-[390px] h-[130px] p-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(notificationType)}`}>
                {notificationType.toUpperCase()}
              </span>
            </div>
            <span className={`px-4 py-2 rounded font-semibold text-sm ${
              isRead ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {isRead ? 'Read' : 'Unread'}
            </span>
          </div>

          {/* Greeting */}
          <div className="text-lg mb-2">
            <span className="text-green-500 font-bold">Dear {itemRecipient},</span>
            <span> {itemTitle}</span>
          </div>

          {/* Divider */}
          <hr className="my-3 border-gray-200" />

          {/* Date & Time */}
          <div className="flex justify-end text-sm text-gray-500 mb-2">
            <span className="mr-3">{formatTimeAgo(createdAt)}</span>
            <span>{formatDate(createdAt)}</span>
          </div>

          {/* Message Box */}
          <div className="bg-gray-50 border border-gray-300 rounded-md p-4 text-sm text-gray-800 mb-4">
            <div className="whitespace-pre-wrap">{itemMessage}</div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="bg-green-500 text-white font-bold text-lg px-10 py-2 rounded-md hover:bg-green-600"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsModal; 