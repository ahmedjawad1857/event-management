import React, { useState } from "react";
import "./AddEvent.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const [eventData, setEventData] = useState({
    heading: "",
    date: {
      day: "",
      month: `${currentMonth}`,
      year: `${currentYear}`,
    },
    location: "",
    description: "",
    img: "",
    link: "",
    type: "Hackathon", // Default event type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      date: {
        ...eventData.date,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueId = Date.now();

    const newEvent = {
      id: uniqueId,
      ...eventData,
    };

    try {
      const res = await axios.post("http://localhost:8002/events", newEvent);
      console.log(res);
      console.log("New Event Added:", newEvent);

      // Reset form data after successful submission
      setEventData({
        heading: "",
        date: {
          day: "",
          month: `${currentMonth}`,
          year: `${currentYear}`,
        },
        location: "",
        description: "",
        img: "",
        link: "",
        type: "Hackathon",
      });

      toast.success("Event added successfully!", {
        position: "bottom-left",
        className: "toast-success",
      });

      // Navigate to home after a delay to ensure the toast is visible
      setTimeout(() => {
        navigate("/event/admin");
        window.location.reload(); // Force reload
      }, 5000);
      console.log("data sent to backend");
    } catch (error) {
      console.error("Error adding event: ", error);
      toast.error("Failed to add event!", {
        position: "bottom-left",
        className: "toast-error",
      });
    }
  };

  const dayNum = (monthName) => {
    const daysInMonth = {
      January: 31,
      February: isLeapYear(eventData.date.year) ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };
    let arr = [];
    for (let i = 1; i <= daysInMonth[monthName]; i++) {
      arr.push(i);
    }

    return arr;
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  return (
    <div className="add-event-container">
      <h1 className="add-event-title">Add New Event</h1>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="heading">Event Title</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={eventData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="date-group">
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <select
              id="day"
              name="day"
              value={eventData.date.day}
              onChange={handleDateChange}
              required
            >
              {dayNum(eventData.date.month).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <select
              id="month"
              name="month"
              value={eventData.date.month}
              onChange={handleDateChange}
              required
            >
              {[
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
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={eventData.date.year}
              onChange={handleDateChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            name="img"
            value={eventData.img}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">
            Registration Form Link (Google Forms / Microsoft Forms / Other
            Forms)
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={eventData.link}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Event Type</label>
          <select
            id="type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
            required
          >
            {["Hackathon", "Workshop", "Competition", "Other"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button-88">
          Add Event
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddEvent;
