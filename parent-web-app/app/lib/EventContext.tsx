'use client';
import { createContext, useContext, useState } from "react";
const EventContext = createContext({
  events: [],
  addEvent: (event: any) => {},
});

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
