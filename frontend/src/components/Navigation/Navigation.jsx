import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
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
            Event detaiks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
