import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'

const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
const Movie_Img = "http://image.tmdb.org/t/p/w154/"

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

    const poster = Movie_Img + flim.poster_path

    const setTagColour = (vote) => {
        if (vote >= 8) {
            return 's'
        } else if (vote >= 6) {
            return 'a'
        } else {
            return 'f'
        }
    }

    return (
        <div>
            <img src={flim.poster_path ? poster : noImage} className={flim.poster_path ? '' : 'noImage'} alt="Movie Image" />
            <h1>{flim.original_title}</h1>
            <p className={`tag ${setTagColour(flim.vote_average)}`}>{flim.vote_average}</p>
            <Link to={`/movies/${movie.id}`}>View Details</Link>
        </div>
    );
}

export default Favmovie;