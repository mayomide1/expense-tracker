import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ChangePassword.css";

const api = import.meta.env.VITE_API_URL;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isPasswordMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  async function handleChangePassword() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !currentPassword || !newPassword) {
      setErrorMsg("All fields are required");
      return;
    } else if (currentPassword === newPassword) {
      return setErrorMsg(
        "Current password cannot be the same has new password",
      );
    }

    try {
      setLoading(true);
      const response = await axios.put(`${api}/change-password`, {
        email,
        currentPassword,
        newPassword,
      });
      console.log(response.data)
      setSuccessMsg(response.data.message);
      setTimeout(() => navigate("/"), 1500);
      setEmail("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.message;
      setErrorMsg(backendMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cp-page">
      <div className="cp-card">
        <header className="cp-header">
          <h2>Change Password</h2>
        </header>

        <p className="cp-message cp-error">{errorMsg}</p>
        <p className="cp-message cp-success">{successMsg}</p>

        <div className="cp-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="cp-field">
          <label htmlFor="currentPassword">Current password</label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="cp-field">
          <label htmlFor="newPassword">New password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="cp-field">
          <label htmlFor="confirmPassword">Confirm new password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {confirmPassword.length > 0 && (
          <p
            style={{
              color: isPasswordMatch ? "var(--accent)" : "var(--danger)",
            }}
          >
            {isPasswordMatch ? "Password Match" : "Password does not match"}
          </p>
        )}
        <button className="cp-button" onClick={() => handleChangePassword()}>
          {loading ? "Changing pasword ..." : "Change Password"}
        </button>

        <p className="cp-footer">
          Back to <span onClick={() => navigate("/")}>login</span>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
