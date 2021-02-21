import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'
import Tag from './Tag'

const poster = "http://image.tmdb.org/t/p/w154/"

const MoviePage = (props) => {

    const id = props.match.params.id

    const [data, setData] = useState([])

    const [image, setImage] = useState('')

    const [genre, setGenre] = useState([])

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data)
                // setName(data.original_title)
                // setDescription(data.overview)
                setGenre(data.genres)
                const image_path = data.poster_path ? poster + data.poster_path : ''
                setImage(image_path)
            })

        // fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     })

    }, [])

    const { original_title, title, overview, release_date, tagline } = data

    let tag = tagline ? tagline : 'None'

    //let genre = genres.map(gen => gen.name)
    const BackDrop_Path = "http://image.tmdb.org/t/p/w1280//";

    // Styling

    const bgImage = {
        backgroundImage: `url(${BackDrop_Path + data.backdrop_path})`,
        backgroundSize: 'cover'
    }

    return (
        <>
            {original_title == '' ? (<div className="loading"></div>) :
                (
                    <div>
                        {/* <h1>{original_title}</h1>
                        <img src={image == '' ? noImage : image} className={image == '' ? 'noImage' : ''} alt={original_title} />
                        <h2>Plot</h2>
                        <hr />
                        <p>{overview}</p>
                        <h2>Tagline</h2>
                        <hr />
                        <p>{tag}</p>
                        <h2>Genre</h2>
                        <hr />
                        {
                            genre.map(gen => (
                                <p>{gen.name}</p>
                            ))
                        } */}
                        <div className="MovieWrapper" style={bgImage}>
                            <div className="MovieInfo">
                                <img
                                    src={image == '' ? noImage : image}
                                    className={image == '' ? 'noImage' : ''}
                                    alt={data.title}
                                />
                                <div>
                                    <div className="flex justify-between">
                                        <h2 className="font-bold text-2xl">{title}</h2>
                                        {genre.map((gen, index) => (
                                            <Tag key={index} genre={gen.name} />
                                        ))}
                                    </div>
                                    <h3>Date of Release: {release_date}</h3>
                                    <h4>Plot</h4>
                                    <hr />
                                    <p>{overview}</p>
                                    <p>Tag Line: {tag}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default MoviePage;
