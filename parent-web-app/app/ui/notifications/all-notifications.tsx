import NotificationNav from "./notification-nav";
import NotificationEntries from "./notification-entries";
import NotificationTable from "./notification-table";
import { notificationsData } from "@/app/lib/placeholder-data";
export default function AllNotifications(){
    return(
       <>
        <NotificationNav/>
        <NotificationEntries/>
        <NotificationTable notificationsData={notificationsData}
        />
       </>
    )
}