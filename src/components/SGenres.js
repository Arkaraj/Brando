import React from 'react';

const SGenres = (props) => {

    const genre = props.match.params.name;

    return (
        <div className="m-10">
            <h1 className="text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl">{genre}</h1>
        </div>
    );
}

export default SGenres;
