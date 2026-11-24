import { IoIosNotifications } from "react-icons/io";
import "./Header.css";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const today = new Date().toLocaleDateString();

  return (
    <header className="app-header">
      <div className="app-header-greeting">
        <p className="app-header-title">Welcome back, {user.fullname}</p>
        <p className="app-header-date">{today}</p>
      </div>

      <div className="app-header-actions">
        <button className="app-header-icon-btn">
          <IoIosNotifications />
        </button>
        <div className="app-header-avatar">{user.fullname?.charAt(0)}</div>
      </div>
    </header>
  );
};

export default Header;