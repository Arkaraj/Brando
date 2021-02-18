import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'

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
                <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>

                <li>
                    <Link to='/register'>
                        Register
                     </Link>
                </li>


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
                    <button onClick={logoutHandler}>
                        Logout
                    </button>
                </li>

            </>
        )
    }

    return (
        <div>
            <h1> <Link to="/">Brando</Link> - A Movie Finding Web App</h1>
            {isAuthenticated ? isAuthenticatedNavBar() : unAuthenticatedNavBar()
            }
        </div>
    );
}

export default Nav;
