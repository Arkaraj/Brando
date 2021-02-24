import React, { useContext } from 'react';
import Search from './Search'
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
                <Link to="/login" className="link">Login</Link>
                <Link to='/register' className="link">Register</Link>
            </>
        )
    }
    const isAuthenticatedNavBar = () => {
        return (
            <>
                <Link to="/profile" className="link">{user.username}</Link>
                <Link to="/favourite" className="link">Favorites</Link>
                <Link to='/connect' className="link">See other Users</Link>
                <Link className="link btn" onClick={logoutHandler}>
                    Logout
                    </Link>

            </>
        )
    }

    return (
        <nav>
            <div className="menu">
                <p className="website_name text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl"><Link to="/">Brando</Link></p>
                <p className="website_name text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl"><Link to="/popular/1">Popular</Link></p>
                <p className="website_name text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl"><Link to="/rated/1">Top Rated</Link></p>
                <p className="website_name text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl"><Link to="/genres">Genres</Link></p>
                {/* <Search /> */}
                <div className="menu_links">
                    {isAuthenticated ? isAuthenticatedNavBar() : unAuthenticatedNavBar()
                    }
                </div>
                <div className="menu_icon">
                    <span className="icon" />
                </div>
            </div>
        </nav>
    );
}

export default Nav;
