import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/hoga-event-logo.png" alt="Hoga Events" />
          </Link>
        </div>
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <div className="icon"></div>
          <div className="icon"></div>
          <div className="icon"></div>
        </div>
        <ul>
          <li>
            <Link to="/">All Events</Link>
          </li>
          <li>
            <Link to="/find-events">Filter</Link>
          </li>
          <li>
            <Link to="/add-event">Add</Link>
          </li>
          <li>
            <Link to="/event/admin">Event details</Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setIsOpen(false)}>
          &times;
        </div>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              All Events
            </Link>
          </li>
          <li>
            <Link to="/find-events" onClick={() => setIsOpen(false)}>
              Filter
            </Link>
          </li>
          <li>
            <Link to="/add-event" onClick={() => setIsOpen(false)}>
              Add
            </Link>
          </li>
          <li>
            <Link to="/event/admin" onClick={() => setIsOpen(false)}>
              Event details
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navigation;
