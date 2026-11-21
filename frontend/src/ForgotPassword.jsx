import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
  return (
    <>
        <h2>Forgot Password</h2>
        <label>Email</label>
        <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Current Password</label>
        <input type="password" placeholder="Enter your current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <label>New Password</label>
        <input type="password" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <button>Reset Password</button>
        <p>Back to <span onClick={() => navigate("/")}>login</span></p>
    </>
  )
}

export default ForgotPassword