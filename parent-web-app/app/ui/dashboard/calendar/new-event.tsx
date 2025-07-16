"use client ";
import { useState } from "react"
// import { useEvents } from "@/app/lib/EventContext";
export default function CreateEventModal({onClose}){
  // const { addEvent } = useEvents();
  const [newEventData, setNewEventData] = useState({
  fromText: "",
  fromDate: "",
  fromTime: "",
  toText: "",
  toDate: "",
  toTime: "",
  description: "",
});
const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !newEventData.fromText ||
    !newEventData.fromDate ||
    !newEventData.description
  ) {
    alert("Please fill in all fields");
    return;
  }

  addEvent(newEventData); 
  onClose(); 
};
    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
          
          {/* Header */}
          <div className="bg-gray-100 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-green-600 font-bold text-sm tracking-wide uppercase">Create Event</h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button className="px-3 py-1 text-[10px] font-semibold uppercase rounded bg-green-600 text-white hover:shadow">
                  Manage
                </button>
                <button className="px-3 py-1 text-[10px] font-semibold uppercase rounded border-2 border-green-600 text-green-600 hover:shadow">
                  New Event
                </button>
              </div>
              <button 
              onClick={onClose} 
              className="text-5xl font-bold px-2 text-red-600 hover:text-red-900">
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="p-5 space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input type="text"  
               value={newEventData.fromText}
              onChange={(e) => setNewEventData({ ...newEventData, fromText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" placeholder="Event start time" />
            </div>

            <div className="flex gap-3">
              <input type="date" 
              value={newEventData.fromDate}
              onChange={(e) => setNewEventData({ ...newEventData, fromDate: e.target.value })}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" />

              <input type="time"
              value={newEventData.fromTime}
              onChange={(e) => setNewEventData({ ...newEventData, fromTime: e.target.value })} 
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input type="text" 
              value={newEventData.toText}
              onChange={(e) => setNewEventData({ ...newEventData, toText: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" placeholder="Event end time" />
            </div>

            <div className="flex gap-3">
              <input type="date" 
              value={newEventData.toDate}
              onChange={(e) => setNewEventData({ ...newEventData, toDate: e.target.value })}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" />

              <input type="time"
              value={newEventData.toTime}
              onChange={(e) => setNewEventData({ ...newEventData, toTime: e.target.value })} 
              className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm" />
            </div>

            <div>
              <textarea 
              value={newEventData.description}
              onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm resize-y min-h-[80px]" placeholder="Event description..."></textarea>
            </div>

            <button type="submit" 
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wide hover:bg-green-700 hover:shadow">
              Save
            </button>
          </form>
        </div>
      </div>
        </>
    )
}