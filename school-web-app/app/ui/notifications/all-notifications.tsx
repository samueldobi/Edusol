"use client";
import { useState, useMemo } from 'react';
import NotificationNav from "./notification-nav";
import NotificationEntries from "./notification-entries";
import NotificationTable from "./notification-table";
import { NotificationType } from "../../src/api/services/notificationService";

interface AllNotificationsProps {
  notifications: NotificationType[];
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
  onNotificationCreated: () => Promise<void>;
}

export default function AllNotifications({ 
  notifications, 
  loading, 
  error, 
  onRefresh,
  onNotificationCreated
}: AllNotificationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter notifications based on search term
  const filteredNotifications = useMemo(() => {
    if (!searchTerm.trim()) return notifications;
    
    const searchLower = searchTerm.toLowerCase();
    return notifications.filter(notification => {
      const title = notification.title || notification.subject || '';
      const message = notification.message || notification.body || '';
      const recipient = notification.recipient_id || notification.receipient || '';
      const type = notification.type || '';
      
      return (
        title.toLowerCase().includes(searchLower) ||
        message.toLowerCase().includes(searchLower) ||
        recipient.toLowerCase().includes(searchLower) ||
        type.toLowerCase().includes(searchLower)
      );
    });
  }, [notifications, searchTerm]);

  // Paginate filtered notifications
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return filteredNotifications.slice(startIndex, endIndex);
  }, [filteredNotifications, currentPage, entriesPerPage]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredNotifications.length / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, filteredNotifications.length);

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEntriesChange = (entries: number) => {
    setEntriesPerPage(entries);
    setCurrentPage(1); // Reset to first page when changing entries
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NotificationNav onRefresh={onRefresh} onNotificationCreated={onNotificationCreated} />
      <NotificationEntries 
        onSearchChange={handleSearchChange}
        onEntriesChange={handleEntriesChange}
        totalEntries={filteredNotifications.length}
        currentEntries={endEntry - startEntry + 1}
      />
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={onRefresh}
              className="text-red-800 underline hover:no-underline text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {!loading && !error && (
        <>
          <NotificationTable notificationsData={paginatedNotifications} />
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {startEntry} to {endEntry} of {filteredNotifications.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}