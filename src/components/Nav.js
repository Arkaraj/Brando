import React from 'react';
import { Route, Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <h1> <a href="/">Brando</a> - A Movie Finding Web App</h1>
            <Link to={`/favourite`}><h4 className="fav">Favorites</h4></Link>
        </div>
    );
}

export default Nav;
