import React from 'react';
import { Route, Link } from 'react-router-dom'

const Other = ({ other }) => {

    const { username, rating, _id } = other
    return (
        <div>
            <Route>
                <h2>UserName: {username}</h2>
                <p>Rating: {rating}</p>
                <Link to={{ pathname: `/connect/${_id}`, state: other }}>Check out There List</Link>
                <p></p>
            </Route>
        </div>
    );
}

export default Other;
