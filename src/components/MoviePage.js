import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'

const poster = "http://image.tmdb.org/t/p/w154/"

const MoviePage = (props) => {

    const id = props.match.params.id
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setName(data.original_title)
                setDescription(data.overview)

                const image_path = data.poster_path ? poster + data.poster_path : ''
                setImage(image_path)
            })

    }, [])

    return (
        <>
            {name == '' ? (<div className="loading"></div>) :
                (
                    <div>
                        <h1>{name}</h1>
                        <img src={image == '' ? noImage : image} className={image == '' ? 'noImage' : ''} alt={name} />
                        <h2>Plot</h2>
                        <hr />
                        <p>{description}</p>
                    </div>
                )}
        </>
    )
}

export default MoviePage;
