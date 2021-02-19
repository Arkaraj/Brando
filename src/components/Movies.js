import React, { useState, useEffect, useContext } from 'react';
import { Route, Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

// import MoviePage from './MoviePage'

const Movie_Img = "http://image.tmdb.org/t/p/w154/"

const Movies = ({ movie }) => {

    // if user is logged in only then
    const { user, isAuthenticated } = useContext(AuthContext)

    const getData = async (id) => {
        fetch(`/user/movies/${user._id}/${id}`)
            .then(async res => {

                if (res.status == 200) {

                    const data = await res.json()
                    setFav(data.fav.fav)
                    if (!data.fav.fav) {
                        await deleteServer(data.fav._id)
                    } else {
                        return
                    }

                } else {
                    return
                }
            }).catch(err => console.log('Error: ' + err))
    }

    const [fav, setFav] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                await getData(movie.id)
            }
            fetchData();
        }
        else {

        }
    }, [])

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
    const poster = Movie_Img + movie.poster_path

    const postMovie = async (id) => {

        const cine = {
            id,
            fav: false
        }

        const res = await fetch(`/user/movies`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(cine)
        })
        const data = res.json()
        return data;
    }

    const modifyServer = async (data) => {

        const cine = {
            id: data.id,
            fav: !fav
        }

        const res = await fetch(`user/movies/${data._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(cine)
        })
    }

    // id is the book id
    const deleteServer = async (id) => {

        await fetch(`/user/movies/${id}`, {
            method: "DELETE"
        })
    }

    const getServer = async (id) => {
        fetch(`/user/movies/${user._id}/${id}`)
            .then(async res => {
                // if !res.ok delete that entry
                if (res.status == 200) {
                    const data = await res.json()
                    await modifyServer(data.fav)
                } else {
                    // await deleteServer(id)
                    const data = await postMovie(id)
                    await modifyServer(data)
                }
            })
        // const data = res.json()

        // const cines = data.map(m => m.id === id)

        // return true
    }

    const favourite = async (id) => {

        // UI changes
        setFav(fav => !fav)
        // Server Side Storing

        await getServer(id)


        // await checkDelete(id,!fav)

        // postMovie(id)

    }

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

    return (
        <Route path="/">
            <div>
                <img src={movie.poster_path ? poster : noImage} className={movie.poster_path ? '' : 'noImage'} alt="Movie Image" />
                <h1>{movie.original_title}</h1>
                <p className={`tag ${setTagColour(movie.vote_average)}`}>{movie.vote_average}</p>
                <Link to={`/movies/${movie.id}`}>View Details</Link>
                {isAuthenticated ? <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={fav ? "blue" : "star"} viewBox="0 0 24 24" onClick={() => favourite(movie.id)}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg> : null}
                {/* <MoviePage id={movie.id} /> */}
            </div>
        </Route>
    );
}

export default Movies;
