import React from 'react';
import { Route, Link } from 'react-router-dom'

const Tag = ({ genre }) => {

    let clr = 'blue'

    if (genre == 'Action' || genre == 'Animation' || genre == 'Science Fiction' || genre == 'Western' || genre == 'Mystery') {
        clr = 'blue'
    } else if (genre == 'Adventure' || genre == 'Comedy' || genre == 'Documentary' || genre == 'Fantasy' || genre == 'Thriller') {
        clr = 'green'
    }
    else if (genre == 'Crime' || genre == 'Horror' || genre == 'History' || genre == 'Romance' || genre == 'War') {
        clr = 'red'
    } else {
        clr = 'yellow'
    }

    return (
        <Link to={`/genres/${genre}`} className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${clr}-200 text-${clr}-700 rounded-full cursor-pointer mx-4 my-2`}>{genre}</Link>
    );
}

export default Tag;
