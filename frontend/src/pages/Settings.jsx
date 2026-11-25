import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Settings.css";

const api = import.meta.env.VITE_API_URL;

const Settings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  /* ---------- Profile ---------- */
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profileStatus, setProfileStatus] = useState(null); // { type, message }
  const [profileLoading, setProfileLoading] = useState(false);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setProfileStatus(null);

    if (!fullname.trim() || !username.trim()) {
      setProfileStatus({
        type: "error",
        message: "Name and username are required.",
      });
      return;
    }

    try {
      setProfileLoading(true);

      // TODO: call your API here, e.g.
      // const res = await axios.put(`${api}/user/profile`, { fullname, username }, { headers })
      // localStorage.setItem("user", JSON.stringify(res.data));
      // setProfileStatus({ type: "success", message: "Profile updated." });
    } catch (err) {
      setProfileStatus({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    } finally {
      setProfileLoading(false);
    }
  }

  /* ---------- Password ---------- */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const isPasswordMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  async function handleChangePassword(e) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        message: "New passwords do not match.",
      });
      return;
    }

    try {
      setPasswordLoading(true);
      const response = await axios.put(
        `${api}/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(response.data);
      setPasswordStatus({ type: "success", message: "Password changed." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordStatus({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    } finally {
      setPasswordLoading(false);
    }
  }

  /* ---------- Danger zone ---------- */
  const [dangerStatus, setDangerStatus] = useState(null);

  async function handleDeleteAllTransactions() {
    if (!window.confirm("Delete ALL your transactions? This cannot be undone."))
      return;

    try {
      // TODO: await axios.delete(`${api}/transactions`, { headers })
      // setDangerStatus({ type: "success", message: "All transactions deleted." });
    } catch (err) {
      setDangerStatus({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  }

  async function handleDeleteAccount() {
    if (!window.confirm("Permanently delete your account and all its data?"))
      return;

    try {
      // TODO: await axios.delete(`${api}/user`, { headers })
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      // navigate("/");
    } catch (err) {
      setDangerStatus({
        type: "error",
        message: err.response?.data?.message || err.message,
      });
    }
  }

  return (
    <div className="settings">
      <main className="settings-main">
        <header className="settings-header">
          <h2>Settings</h2>
          <p>Manage your profile, password and preferences.</p>
        </header>

        <div className="settings-content">
          <section className="settings-card">
            <h3 className="settings-card-title">Profile</h3>
            <p className="settings-card-desc">
              Your name and username shown across the app.
            </p>

            <form onSubmit={handleSaveProfile}>
              <div className="settings-row">
                <div className="settings-field">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="settings-field">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <Status status={profileStatus} />

              <div className="settings-actions">
                <button
                  className="settings-btn settings-btn-primary"
                  disabled={profileLoading}
                >
                  {profileLoading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>

          <section className="settings-card">
            <h3 className="settings-card-title">Password</h3>
            <p className="settings-card-desc">Use at least 8 characters.</p>

            <form onSubmit={handleChangePassword}>
              <div className="settings-field">
                <label htmlFor="currentPassword">Current password</label>
                <input
                  id="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="settings-row">
                <div className="settings-field">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="settings-field">
                  <label htmlFor="confirmPassword">Confirm new password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {confirmPassword.length > 0 && (
                <p
                  style={{
                    color: isPasswordMatch ? "var(--accent)" : "var(--danger)",
                  }}
                >
                  {isPasswordMatch
                    ? "Password Match"
                    : "Password does not match"}
                </p>
              )}

              <Status status={passwordStatus} />

              <div className="settings-actions">
                <button
                  className="settings-btn settings-btn-primary"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Updating..." : "Update password"}
                </button>
              </div>
            </form>
          </section>

          {/* ---------- Danger zone ---------- */}
          <section className="settings-card settings-card-danger">
            <h3 className="settings-card-title">Danger zone</h3>
            <p className="settings-card-desc">
              These actions cannot be undone.
            </p>

            <div className="settings-danger-row">
              <div>
                <p className="settings-danger-title">Delete all transactions</p>
                <p className="settings-danger-text">
                  Clears your income and expense history.
                </p>
              </div>
              <button
                type="button"
                className="settings-btn settings-btn-danger"
                onClick={handleDeleteAllTransactions}
              >
                Delete transactions
              </button>
            </div>

            <div className="settings-danger-row">
              <div>
                <p className="settings-danger-title">Delete account</p>
                <p className="settings-danger-text">
                  Permanently removes your account and data.
                </p>
              </div>
              <button
                type="button"
                className="settings-btn settings-btn-danger"
                onClick={handleDeleteAccount}
              >
                Delete account
              </button>
            </div>

            <Status status={dangerStatus} />
          </section>
        </div>
      </main>
    </div>
  );
};

function Status({ status }) {
  if (!status) return null;

  return (
    <p
      className={`settings-status settings-status-${status.type}`}
      role={status.type === "error" ? "alert" : "status"}
    >
      {status.message}
    </p>
  );
}

export default Settings;
