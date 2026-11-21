import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const api = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount() {
    if (!fullName || !username || !email || !password === "") {
      setErrorMsg("All field are required");
    }
    try {
      setLoading(true);
      const response = await axios.post(`${api}/register`, {
        fullName,
        username,
        email,
        password,
      });
      localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
      navigate("/dashboard");
      setFullName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.message;
      setErrorMsg(backendMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Create account</h2>
        </header>

        <p className="auth-error">{errorMsg}</p>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={email.toLowerCase()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your Username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={() => handleCreateAccount()}>
          {loading ? "Creating account...." : "Create account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;