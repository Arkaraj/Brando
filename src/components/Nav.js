import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'






import Search from './Search'

const Nav = (props) => {

    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const logoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user)
                setIsAuthenticated(false)
            }
        })
    }

    const unAuthenticatedNavBar = () => {
        return (
            <>
                
                <ul class="nav">                    
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Search/></li>                    
                </ul>
            </>
        )
    }
    const isAuthenticatedNavBar = () => {
        return (
            <>
                <h4><Link to="/favourite" className="fav">Favorites</Link></h4>
                <li>
                    {user.username}
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/connect'>See other Users</Link>
                </li>
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
            </>
        )
    }

    return (
        <>
            <div class="main-title">
                <h1> <Link to="/">Brando</Link> - A Movie Finding Web App</h1>                
            </div>
            {isAuthenticated ? isAuthenticatedNavBar() : unAuthenticatedNavBar()}
        </>
    );
}

export default Nav;
