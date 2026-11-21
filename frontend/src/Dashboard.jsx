import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    
    function handleLogout(){
        localStorage.removeItem("loggedUser")
        navigate("/")
    }
  return (
    <>
        <h2>Dashboard</h2>
        <p>Name: {loggedUser.fullname}</p>
        <p>Username: {loggedUser.username}</p>
        <p>Email: {loggedUser.email}</p>
        <button onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Dashboard