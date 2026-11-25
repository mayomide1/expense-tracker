import "../css/Header.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";

const Header = ({ onToggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const today = new Date().toLocaleDateString();

  return (
    <header className="app-header">
      <div className="app-header-greeting">
        <button
          className="app-header-icon-btn"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <GiHamburgerMenu />
        </button>

        <div className="app-header-text">
          <p className="app-header-title">Welcome back</p>
          <p className="app-header-date">{today}</p>
        </div>
      </div>

      <div className="app-header-actions">
        <div className="app-header-avatar">{user.fullname?.charAt(0)}</div>
      </div>
    </header>
  );
};

export default Header;