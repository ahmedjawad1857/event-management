import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEventContext } from "../../context/EventContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPage.css";

const AdminPage = () => {
  const { events, loading, setEvents } = useEventContext();
  const [loadingId, setLoadingId] = useState(null); // Track which event is being deleted

  const handleDelete = async (_id) => {
    setLoadingId(_id); // Set the ID of the event being deleted
    try {
      const res = await axios.delete("http://localhost:8002/delEvent", {
        data: { id: _id },
      });
      console.log(res.data.msg);

      // Update state after a delay to allow toast message to show
      
        setEvents(events.filter((event) => event._id !== _id));

        toast.success(`Event with ID ${_id} deleted successfully!`, {
          position: "bottom-left",
          autoClose: 3000,
          className: "toast-success",
        });
      
    } catch (error) {
      console.error("Error deleting event: ", error);
      toast.error("Failed to delete event.", {
        position: "bottom-left",
        autoClose: 3000,
        className: "toast-error",
      });
    } finally {
      setLoadingId(null); // Clear the loading state
    }
  };

  const groupEventsByType = (events) => {
    return events.reduce((acc, event) => {
      const type = event.type || "Other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(event);
      return acc;
    }, {});
  };

  const getMonthIndex = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(monthName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const today = new Date();
  const pastEvents = events.filter((event) => {
    const eventDate = new Date(
      event.date.year,
      getMonthIndex(event.date.month),
      event.date.day
    );
    return eventDate < today;
  });

  const groupedEvents = groupEventsByType(
    events.filter((event) => {
      const eventDate = new Date(
        event.date.year,
        getMonthIndex(event.date.month),
        event.date.day
      );
      return eventDate >= today;
    })
  );

  return (
    <div className="admin-page-container">
      <h1>Admin Page - Manage Events</h1>
      <Link to="/add-event" className="admin-add-button">
        Add New Event
      </Link>
      <div>
        <h2 className="event-type-heading">Expired Events</h2>
        <ul className="admin-event-list">
          {pastEvents.map((event) => (
            <li key={event._id} className="admin-event-item">
              <div className="admin-event-details">
                <h3>{event.heading}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong> {event.date.day} {event.date.month},{" "}
                  {event.date.year}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
              <div className="admin-event-actions">
                <button
                  onClick={() => handleDelete(event._id)}
                  className="admin-delete-button"
                >
                  {loadingId === event._id ? (
                    <div className="loader"></div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {Object.keys(groupedEvents).map((type) => (
        <div key={type}>
          <h2 className="event-type-heading">{type} Events</h2>
          <ul className="admin-event-list">
            {groupedEvents[type].map((event) => (
              <li key={event._id} className="admin-event-item">
                <div className="admin-event-details">
                  <h3>{event.heading}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {event.date.day} {event.date.month},{" "}
                    {event.date.year}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
                <div className="admin-event-actions">
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="admin-delete-button"
                  >
                    {loadingId === event._id ? (
                      <div className="loader"></div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
