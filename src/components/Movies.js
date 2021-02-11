import React from 'react';

const Movie_Img = "http://image.tmdb.org/t/p/w154/"

const Movies = ({ movie }) => {
    return (
        <div>
            <img src={Movie_Img + movie.poster_path} alt="Movie Image" />
            <h1>{movie.original_title}</h1>
            <p>{movie.vote_average}</p>
            <a href={'#'}>View Deatails</a>
        </div>
    );
}

export default Movies;
