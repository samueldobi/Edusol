"use client";
import React, { useState } from 'react';
import { NotificationType, partialUpdateNotification, deleteNotification } from "../../src/api/services/notificationService";

interface NotificationDetailsModalProps {
  notification: NotificationType | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const NotificationDetailsModal = ({ notification, onClose, onSuccess }: NotificationDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize edit form when notification changes
  React.useEffect(() => {
    if (notification) {
      setEditForm({
        title: notification.title || notification.subject || '',
        message: notification.message || notification.body || '',
        type: notification.type
      });
    }
  }, [notification]);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!notification) return;
    
    setIsSaving(true);
    try {
      const itemId = notification.id || notification._id;
      if (!itemId) throw new Error('Notification ID not found');

      await partialUpdateNotification(itemId, editForm);
      onSuccess?.();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update notification:', error);
      alert('Failed to update notification. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (notification) {
      setEditForm({
        title: notification.title || notification.subject || '',
        message: notification.message || notification.body || '',
        type: notification.type
      });
    }
  };

  const handleDelete = async () => {
    if (!notification) return;
    
    setIsDeleting(true);
    try {
      const itemId = notification.id || notification._id;
      if (!itemId) throw new Error('Notification ID not found');

      await deleteNotification(itemId);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete notification:', error);
      alert('Failed to delete notification. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const itemTitle = notification.title || notification.subject || 'No Title';
  const itemMessage = notification.message || notification.body || 'No Message';
  const itemRecipient = notification.recipient_id || notification.receipient || 'All';

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="max-w-3xl w-full bg-white border-2 border-green-500 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
          {/* Header Buttons */}
          <div className="flex justify-end gap-3 p-4 pb-0">
            <button 
              onClick={handleEdit}
              disabled={isEditing}
              className="bg-green-100 text-green-500 border border-green-500 font-semibold rounded-md px-5 py-2 hover:bg-green-200 disabled:opacity-50"
            >
              {isEditing ? 'EDITING...' : 'EDIT'}
            </button>
            <button 
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-100 text-red-500 border border-red-500 font-semibold rounded-md px-5 py-2 hover:bg-red-200 disabled:opacity-50"
            >
              {isDeleting ? 'DELETING...' : 'DELETE'}
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-100 text-gray-500 border border-gray-500 font-semibold rounded-md px-5 py-2 hover:bg-gray-200"
            >
              CLOSE
            </button>
          </div>

          {/* Title */}
          <h2 className="text-green-500 font-bold text-2xl md:text-3xl mt-4 ml-6">Notification Details</h2>

          {/* Main Content */}
          <div className="px-6 pb-6">
            {/* Type Badge and Result */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 mb-3">
              <div className="bg-blue-100 border-2 border-blue-600 rounded-lg flex items-center justify-center w-full md:w-[390px] h-[130px] p-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(notification.type)}`}>
                  {notification.type.toUpperCase()}
                </span>
              </div>
              <span className={`px-4 py-2 rounded font-semibold text-sm ${
                notification.is_read ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {notification.is_read ? 'Read' : 'Unread'}
              </span>
            </div>

            {/* Greeting */}
            <div className="text-lg mb-2">
              <span className="text-green-500 font-bold">Dear {itemRecipient},</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded text-sm w-full"
                  placeholder="Enter title..."
                />
              ) : (
                <span> {itemTitle}</span>
              )}
            </div>

            {/* Divider */}
            <hr className="my-3 border-gray-200" />

            {/* Date & Time */}
            <div className="flex justify-end text-sm text-gray-500 mb-2">
              <span className="mr-3">{formatTimeAgo(notification.created_at)}</span>
              <span>{formatDate(notification.created_at)}</span>
            </div>

            {/* Message Box */}
            <div className="bg-gray-50 border border-gray-300 rounded-md p-4 text-sm text-gray-800 mb-4">
              {isEditing ? (
                <textarea
                  value={editForm.message}
                  onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full h-32 p-2 border border-gray-300 rounded resize-none"
                  placeholder="Enter message..."
                />
              ) : (
                <div className="whitespace-pre-wrap">{itemMessage}</div>
              )}
              
              {/* Type Selector (when editing) */}
              {isEditing && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value as 'info' | 'success' | 'warning' | 'error' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleCancel}
                    className="bg-gray-500 text-white font-bold text-lg px-6 py-2 rounded-md hover:bg-gray-600"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-500 text-white font-bold text-lg px-6 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                  >
                    {isSaving ? 'SAVING...' : 'SAVE'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={onClose}
                  className="bg-green-500 text-white font-bold text-lg px-10 py-2 rounded-md hover:bg-green-600"
                >
                  CLOSE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this notification? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationDetailsModal; 