import React from 'react';
import Search from './Search'

const Nav = ({ setMovies }) => {
    return (
        <div>
            <h1> <a href="/">Brando</a> - A Movie Finding Web App</h1>
            <Search setMovies={setMovies} />
        </div>
    );
}

export default Nav;
