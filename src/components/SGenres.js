import React, { useEffect } from 'react';

const SGenres = (props) => {

    const genre = props.match.params.name;

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)

    }, [])

    return (
        <div className="m-10">
            <h1 className="text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl">{genre}</h1>

            <div className="m-5 p-5">
                <p>
                    Sorry, To inform TMDB does not have any Movies with specific Genre Search yet
                </p>
            </div>
        </div>
    );
}

export default SGenres;
