"use client";
import { useState, useEffect } from "react";
import { 
  fetchNotificationsList, 
  deleteNotification, 
  partialUpdateNotification,
  NotificationType 
} from "../../src/api/services/notificationService";

interface ManageNotificationModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ManageNotificationModal({ onClose, onSuccess }: ManageNotificationModalProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotificationsList();
      setNotifications(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      onSuccess?.();
    } catch (err) {
      console.error('Failed to delete notification:', err);
      setError('Failed to delete notification');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = async (id: string) => {
    setEditingId(id);
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setEditForm({
        title: notification.title,
        message: notification.message,
        type: notification.type
      });
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await partialUpdateNotification(id, editForm);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, ...editForm } : n)
      );
      setEditingId(null);
      onSuccess?.();
    } catch (err) {
      console.error('Failed to update notification:', err);
      setError('Failed to update notification');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', message: '', type: 'info' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Manage Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="p-3 font-semibold border-b">Type</th>
                  <th className="p-3 font-semibold border-b">Title</th>
                  <th className="p-3 font-semibold border-b">Message</th>
                  <th className="p-3 font-semibold border-b">Recipient</th>
                  <th className="p-3 font-semibold border-b">Date</th>
                  <th className="p-3 font-semibold border-b">Status</th>
                  <th className="p-3 font-semibold border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No notifications found
                    </td>
                  </tr>
                ) : (
                  notifications.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="p-3">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          item.title
                        )}
                      </td>
                      <td className="p-3">
                        {editingId === item.id ? (
                          <textarea
                            value={editForm.message}
                            onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none"
                            rows={2}
                          />
                        ) : (
                          <div className="max-w-xs truncate" title={item.message}>
                            {item.message}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        {editingId === item.id ? (
                          <select
                            value={editForm.type}
                            onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value as any }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                          </select>
                        ) : (
                          item.recipient_id
                        )}
                      </td>
                      <td className="p-3">{formatDate(item.created_at)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.is_read ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.is_read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          {editingId === item.id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="text-green-600 hover:bg-green-50 rounded p-1"
                                title="Save"
                              >
                                ✅
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:bg-gray-50 rounded p-1"
                                title="Cancel"
                              >
                                ❌
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="text-cyan-600 hover:bg-cyan-50 rounded p-1"
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="text-red-500 hover:bg-red-50 rounded p-1 disabled:opacity-50"
                                title="Delete"
                              >
                                {deletingId === item.id ? '⏳' : '🗑️'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
