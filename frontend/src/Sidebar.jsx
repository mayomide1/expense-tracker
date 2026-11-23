import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    navigate("/");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <aside className="sb">
      <nav className="sb-nav">
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/transactions">
          <button>Transactions</button>
        </Link>
      </nav>

      <div className="sb-profile" ref={profileRef}>
        {menuOpen && (
          <div className="sb-menu" role="menu">
            <button
              className="sb-menu-item"
              role="menuitem"
              onClick={() => handleLogout()}
            >
              Log out @{loggedUser.username}
            </button>
          </div>
        )}

        <button
          className="sb-profile-btn"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sb-avatar">{loggedUser.fullname?.charAt(0)}</span>
          <span className="sb-user">
            <span className="sb-name">{loggedUser.fullname}</span>
            <span className="sb-handle">@{loggedUser.username}</span>
          </span>
          <span className="sb-dots" aria-hidden="true">
            ⋯
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;