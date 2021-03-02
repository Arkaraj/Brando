import React, { useState, useEffect } from 'react';

const Wish = ({ tmdbId }) => {

    const [flim, setFlim] = useState([])

    const fetchMovie = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_API_KEY}`)
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
        <li>
            {flim.title}
        </li>
    );
}

export default Wish;
