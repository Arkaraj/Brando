import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'

const poster = "http://image.tmdb.org/t/p/w154/"

const MoviePage = (props) => {

    const id = props.match.params.id;
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setimage] = useState('')


    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setName(data.original_title)
                setDescription(data.overview)
                const image_path = poster + data.poster_path
                setimage(image_path)
            })

    }, [])

    return (
        <div>
            <h1>{name}</h1>
            <img src={image} alt={name} />
            <p>{description}</p>
        </div>
    );
}

export default MoviePage;
