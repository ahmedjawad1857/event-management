import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <Link to={"/"}>
            <img
              src="/hoga-event-logo.png"
              alt="Hoga Events | You event management team "
            />
          </Link>
        </li>
        <li>
          <Link to="/" reloadDocument>
            All Events
          </Link>
        </li>
        <li>
          <Link to="/find-events" reloadDocument>
            Filter
          </Link>
        </li>
        <li>
          <Link to="/add-event" reloadDocument>
            Add
          </Link>
        </li>
        <li>
          <Link to="/event/admin" reloadDocument>
            Event details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
