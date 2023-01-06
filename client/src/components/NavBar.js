import React, {useState} from "react"
import {Link, Route} from 'react-router-dom'
import Home from "./Home"
import UserRegister from "./user/UserRegister"
import UserLogin from "./user/Login"
import AdminLogin from "./admin/AdminLogin"
import UserProfile from "./user/UserProfile"
import AdminDashboard from "./admin/AdminDashboard"
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import swal from 'sweetalert'


const NavBar = (props) => {
    const [loggedIn,setLoggedIn] = useState(Boolean(localStorage.getItem('UserToken')))

    const handleToggle = (status) => {
        setLoggedIn(status)
    }

    const handleLogout = () => {
        localStorage.removeItem('UserToken') 
        localStorage.removeItem('AdminToken')
        localStorage.removeItem('CountryToken')
        setLoggedIn(false)
        swal({
            title: "successfully Logout",
            icon: "success"
        })
    }
    
    return (
        <div>
            <div className="navigation">
            <nav className="navbar navbar-inverse bg-info text-white">
            { loggedIn || localStorage.getItem('AdminToken') ? (
            <Link to="/home" onClick={handleLogout} className="navbar-brand  text-white">Logout</Link>
            ) : (
                <div>
                <Link to="/user/register" className="navbar-brand  text-white">Register</Link>
                <Link to="/user/login" className="navbar-brand  text-white">Login</Link>
                <Link to="/admin/login" className="navbar-brand  text-white">Admin</Link>
                </div>
            )}
            </nav>
            </div>
            
            <Route path="/home" component={Home} exact/> 
            <Route path="/user/register" component={UserRegister} />
            <Route path="/user/login" render={(props) => {
                return <UserLogin {...props} handleToggle={handleToggle}/>
            }} />
            <Route path="/admin/login" render={(props) => {
                return <AdminLogin {...props} handleToggle={handleToggle} />
            }} />

            <PrivateRoute path="/user/profile" component={UserProfile} />
            <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        </div>
    
    )
}
export default NavBar