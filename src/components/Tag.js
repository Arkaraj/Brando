import React from 'react';

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
        <p className={`text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${clr}-200 text-${clr}-700 rounded-full cursor-pointer`}>{genre}</p>
    );
}

export default Tag;
