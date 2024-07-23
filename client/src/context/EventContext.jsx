import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { eventList } from "../utils/EventDatabase";
const EventContext = createContext();

export const useEventContext = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // adding initial events which are in slider

        const res = await axios.get("http://localhost:8002/getEvents");
        if (res.data.length > 0) {
          setEvents(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
