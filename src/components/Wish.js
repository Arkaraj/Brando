import React, { useState, useEffect } from 'react';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Wish = ({ tmdbId }) => {

    const [flim, setFlim] = useState([])

    const [loaded, setLoaded] = useState(false)

    const [image, setImage] = useState('')

    const poster = "http://image.tmdb.org/t/p/w154/"

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    const fetchMovie = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_API_KEY}`)
        const data = await res.json()
        // console.log(data)
        const image_path = data.poster_path ? poster + data.poster_path : ''
        setImage(image_path)
        setLoaded(true)
        return data
    }

    useEffect(() => {

        const getMovie = async () => {
            const movieFromServer = await fetchMovie()
            setFlim(movieFromServer)
        }

        getMovie()

    }, [])

    const minToHrs = (minutes) => {
        let hour = Math.floor(minutes / 60)
        let seconds = minutes - (60 * hour)

        return `${hour}hr ${seconds}min`
    }

    const { id, title, overview, vote_average: rating, runtime } = flim

    return (

        <>
            {loaded ? (<>
                <div className="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg mb-2">
                    <div id="header" className="flex">
                        <img alt="mountain" className="w-45 rounded-md border-2 border-gray-300" src={image} />
                        <div id="body" className="flex flex-col ml-5">
                            <h4 id="name" className="text-xl font-semibold mb-2">{title}</h4>
                            <p id="job" className="text-gray-800 mt-2">{overview}</p>
                            <div className="flex mt-5">
                                {/* svg */}
                                {/* <img alt="avatar" className="w-6 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" /> */}
                                <BsFillBookmarksFill className="cursor-pointer rounded mt-1 hover:text-green-400" />
                                {/* <input type="checkbox" className="w-6 rounded-full" /> */}
                                <p className="ml-3">Watched?</p>
                                <p className="ml-3">Rating: {rating}</p>
                                <p className="ml-3">Run Time: {minToHrs(runtime)}</p>
                            </div>
                            <Link to={`/movies/${id}/#Movie`} className=" ml-auto hover:text-blue-500 hover:underline">
                                Show more <FiArrowRight className=" inline-flex" />
                            </Link>
                        </div>
                    </div>
                </div>
            </>) :
                (<div className="w-full flex items-center flex-col">
                    <div className="flex bg-white shadow-md p-4 rounded-md mb-4">
                        <div data-placeholder className="mr-2 h-20 w-20 rounded-full overflow-hidden relative bg-gray-200">
                        </div>
                        <div className="flex flex-col justify-between">
                            <div data-placeholder className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200">
                            </div>
                            <div data-placeholder className="h-10 w-40 overflow-hidden relative bg-gray-200">
                            </div>
                        </div>
                    </div>
                </div>)}
        </>

    );
}

export default Wish;
