import React, { useState, useEffect, useContext } from 'react';
import { Route, Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Tag from './Tag'

const poster = "http://image.tmdb.org/t/p/w154/"

const MoviePage = (props) => {

    const { user, isAuthenticated } = useContext(AuthContext)


    const id = props.match.params.id

    const [data, setData] = useState([])

    const [image, setImage] = useState('')

    const [genre, setGenre] = useState([])

    const [trailer, settrailer] = useState('')

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    const youtube = 'https://www.youtube.com/embed/'

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

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {

                // List of all videos data.results

                //https://youtu.be/data.results[0].key
                if (data.results[0]) {
                    if (data.results[0].key != null) {
                        settrailer(youtube + data.results[0].key)
                    }
                } else {
                    return
                }

            })

    }, [])

    const { original_title, title, overview, release_date, tagline, vote_average } = data

    let tag = tagline ? tagline : 'None'

    //let genre = genres.map(gen => gen.name)
    const BackDrop_Path = "http://image.tmdb.org/t/p/w1280//";

    // Styling

    const bgImage = {
        backgroundImage: `url(${BackDrop_Path + data.backdrop_path})`,
        backgroundSize: 'contain'
    }

    return (
        <>
            {original_title == '' ? (<div className="loading"></div>) :
                (
                    <div>
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
                                    <h3>Rating: {vote_average}</h3>
                                    <h3>Date of Release: {release_date}</h3>
                                    <h4>Plot</h4>
                                    <hr />
                                    <p>{overview}</p>
                                    <h4>Tag Line</h4>
                                    <hr />
                                    <p>{tag}</p>
                                    <h4 className="font-bold text-xl">Trailer</h4>
                                    <hr />
                                    {/* <p> {isAuthenticated ? 'Your Rating:' : null}</p> */}
                                    <div>
                                        {
                                            trailer ? <iframe width="560" height="315" src={`${trailer}`} allowFullScreen></iframe> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default MoviePage;
