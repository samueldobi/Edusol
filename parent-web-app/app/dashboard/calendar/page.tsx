import Calendar from "@/app/ui/dashboard/calendar/calendar";
import { EventProvider } from "@/app/lib/EventContext";
export default function Page() {
  return(
    <EventProvider>
      <Calendar/>
    </EventProvider>
     
  )
}
