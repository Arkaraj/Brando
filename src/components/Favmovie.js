import React, { useState, useEffect } from 'react';

const Favmovie = ({ movie }) => {

    const [flim, setFlim] = useState([])

    const fetchMovie = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}`)
        const data = await res.json()

        return data
    }

    useEffect(() => {

        const getMovie = async () => {
            const movieFromServer = await fetchMovie()
            setFlim(movieFromServer)
        }

        getMovie()

    }, [])

    return (
        <div>
            <h1>{flim.original_title}</h1>
            <p>Ratings: {flim.vote_average}</p>
            <p>Id: {movie.id}</p>
        </div>
    );
}

export default Favmovie;