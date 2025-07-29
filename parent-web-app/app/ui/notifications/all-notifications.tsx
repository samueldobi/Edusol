import NotificationNav from "./notification-nav";
import NotificationEntries from "./notification-entries";
import NotificationTable from "./notification-table";
import { NotificationType } from "../../src/api/services/notificationService";

interface AllNotificationsProps {
  notifications: NotificationType[];
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

export default function AllNotifications({ 
  notifications, 
  loading, 
  error, 
  onRefresh 
}: AllNotificationsProps) {
  return (
    <>
      <NotificationNav onRefresh={onRefresh} />
      <NotificationEntries />
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {!loading && !error && (
        <NotificationTable notificationsData={notifications} />
      )}
    </>
  );
}