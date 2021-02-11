import React from 'react';
import { Route, Link } from 'react-router-dom'


// import MoviePage from './MoviePage'

const Movie_Img = "http://image.tmdb.org/t/p/w154/"

const Movies = ({ movie }) => {

    return (
        <Route exact path="/">
            <div>
                <img src={Movie_Img + movie.poster_path} alt="Movie Image" />
                <h1>{movie.original_title}</h1>
                <p>{movie.vote_average}</p>
                <Link to={`/${movie.id}`}>View Details</Link>
                {/* <MoviePage id={movie.id} /> */}
            </div>
        </Route>
    );
}

export default Movies;
