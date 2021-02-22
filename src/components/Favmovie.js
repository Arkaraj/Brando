import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'
import UserService from '../Services/UserService'

const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
const Movie_Img = "http://image.tmdb.org/t/p/w154/"

const Favmovie = ({ movie }) => {

    const [flim, setFlim] = useState([])
    const [rate, setRate] = useState(0)

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
        } else if (vote >= 5) {
            return 'a'
        } else if (vote > 0) {
            return 'f'
        }
        else if (vote == 0) {
            return 'n'
        }
    }

    const giveRating = e => {
        // Stackoverflowed this technique to validate min 0 and max 10
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setRate(value);
    }

    const SubmitForm = e => {
        e.preventDefault()

        UserService.rateMovies(movie._id, rate).then(data => {
            alert('Updated Rating!!')
            console.log(data)
        })
    }

    return (
        <div>
            <img src={flim.poster_path ? poster : noImage} className={flim.poster_path ? '' : 'noImage'} alt="Movie Image" />
            <h1>{flim.original_title}</h1>
            <p className={`tag ${setTagColour(flim.vote_average)}`}>{flim.vote_average}</p>
            <h1>Your Rating: {movie.rating}</h1>
            <form onSubmit={SubmitForm}>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <submit onClick={() => setRate(prev => prev - 1)} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none border-r border-gray-50">
                        <span className="ml-2 text-2xl font-thin">−</span>
                    </submit>
                    <input type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none" custom-input-number min="0" max="10" value={rate} onChange={giveRating} />
                    <submit onClick={() => setRate(prev => prev + 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer border-l border-gray-50">
                        <span className="ml-2 text-2xl font-thin">+</span>
                    </submit>
                </div>
                <button>Submit Rating</button>
            </form>
            <Link to={`/movies/${movie.id}`}>View Details</Link>
        </div>
    );
}

export default Favmovie;