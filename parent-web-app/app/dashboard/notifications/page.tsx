"use client";

import { useState, useEffect } from 'react';
import { fetchNotificationsList, testFetchNotifications } from '../../src/api/services/notificationService';
import { NotificationType } from '../../src/api/services/notificationService';
import AllNotifications from '../../ui/notifications/all-notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[NotificationsPage] Loading notifications...');
      
      const data = await fetchNotificationsList();
      console.log('[NotificationsPage] Raw data received:', data);
      
      // Ensure data is an array
      const notificationsArray = Array.isArray(data) ? data : [];
      console.log('[NotificationsPage] Processed notifications array:', notificationsArray);
      console.log('[NotificationsPage] Number of notifications:', notificationsArray.length);
      
      setNotifications(notificationsArray);
    } catch (err: any) {
      console.error('[NotificationsPage] Failed to load notifications:', err);
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('[NotificationsPage] Refreshing notifications...');
    await loadNotifications();
  };

  const handleNotificationCreated = async () => {
    console.log('[NotificationsPage] Notification created, refreshing list...');
    await loadNotifications();
  };

  const handleTestFetch = async () => {
    console.log('[NotificationsPage] Running test fetch...');
    await testFetchNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <button
          onClick={handleTestFetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Fetch
        </button>
      </div>
      
      <AllNotifications
        notifications={notifications}
        loading={loading}
        error={error}
        onRefresh={handleRefresh}
        onNotificationCreated={handleNotificationCreated}
      />
    </div>
  );
}