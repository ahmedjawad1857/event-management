import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
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
        // const eventsCollection = collection(db, "events");
        // const eventsSnapshot = await getDocs(eventsCollection);
        // const eventsList = eventsSnapshot.docs.map((doc) => ({
        //   ...doc.data(),
        //   fid: doc.id,
        // }));
        // setEvents(eventsList);
        // console.log(eventsList);
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
