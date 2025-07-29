"use client";

import { useState, useEffect } from 'react';
import AllNotifications from "../../ui/notifications/all-notifications";
import { fetchNotificationsList, NotificationType } from "../../src/api/services/notificationService";

export default function Page() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                setLoading(true);
                const response = await fetchNotificationsList();
                
                // Ensure we have an array of notifications
                let notificationsData: NotificationType[] = [];
                
                if (Array.isArray(response)) {
                    notificationsData = response;
                } else if (response && typeof response === 'object') {
                    const responseObj = response as any;
                    if ('data' in responseObj && Array.isArray(responseObj.data)) {
                        notificationsData = responseObj.data;
                    } else if ('notifications' in responseObj && Array.isArray(responseObj.notifications)) {
                        notificationsData = responseObj.notifications;
                    } else {
                        console.warn('Unexpected API response structure:', response);
                        notificationsData = [];
                    }
                } else {
                    console.warn('Unexpected API response structure:', response);
                    notificationsData = [];
                }
                
                setNotifications(notificationsData);
                setError(null);
            } catch (err) {
                console.error('Failed to load notifications:', err);
                setError('Failed to load notifications. Please try again later.');
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const handleRefresh = async () => {
        try {
            setLoading(true);
            const response = await fetchNotificationsList();
            
            // Ensure we have an array of notifications
            let notificationsData: NotificationType[] = [];
            
            if (Array.isArray(response)) {
                notificationsData = response;
            } else if (response && typeof response === 'object') {
                const responseObj = response as any;
                if ('data' in responseObj && Array.isArray(responseObj.data)) {
                    notificationsData = responseObj.data;
                } else if ('notifications' in responseObj && Array.isArray(responseObj.notifications)) {
                    notificationsData = responseObj.notifications;
                } else {
                    console.warn('Unexpected API response structure:', response);
                    notificationsData = [];
                }
            } else {
                console.warn('Unexpected API response structure:', response);
                notificationsData = [];
            }
            
            setNotifications(notificationsData);
            setError(null);
        } catch (err) {
            console.error('Failed to refresh notifications:', err);
            setError('Failed to refresh notifications. Please try again later.');
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AllNotifications 
                notifications={notifications}
                loading={loading}
                error={error}
                onRefresh={handleRefresh}
            />
        </>
    );
}