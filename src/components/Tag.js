import React from 'react';

const Tag = ({ genre }) => {

    let clr = 'blue'

    if (genre == 'Action' || 'Animation' || 'Science Fiction' || 'Western' || 'Mystery') {
        clr = 'green'
    } else if (genre == 'Adventure' || 'Comedy' || 'Documentary' || 'Fantasy' || 'Thriller') {
        clr = 'green'
    }
    else if (genre == 'Crime' || 'Horror' || 'History' || 'Romance' || 'War') {
        clr = 'red'
    } else {
        clr = 'yellow'
    }

    return (
        <p className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${clr}-200 text-${clr}-700 rounded-full cursor-pointer`}>{genre}</p>
    );
}

export default Tag;
