"use client";

import { useState, useEffect } from 'react';
import { fetchNotificationsList } from '../../src/api/services/notificationService';
import { NotificationType } from '../../src/api/services/notificationService';
import { getErrorMessage } from '../../src/utils/errorHandling';
import AllNotifications from '../../ui/notifications/all-notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchNotificationsList();
      
      // Ensure data is an array
      const notificationsArray = Array.isArray(data) ? data : [];
      
      setNotifications(notificationsArray);
    } catch (err: unknown) {
      console.error('[NotificationsPage] Failed to load notifications:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadNotifications();
  };

  const handleNotificationCreated = async () => {
    await loadNotifications();
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#1AA939]">Notifications</h1>
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