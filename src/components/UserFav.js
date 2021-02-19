import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService'
import Movies from './Movies'

const UserFav = (props) => {
    const id = props.match.params.id

    const { username, rating } = props.location.state

    const [fav, setFav] = useState([])

    let send = []

    useEffect(() => {

        const RecieveData = async () => {
            const data = await UserService.allFavMovies(id).then(data => data)

            data.map((mv) => {
                fetch(`https://api.themoviedb.org/3/movie/${mv.id}?api_key=${process.env.REACT_APP_API_KEY}`).then(res => res.json()).then(data => {
                    setFav(prev => [...prev, data])
                })
            })

        }

        RecieveData();

    }, [])

    return (
        <div>
            <h1>{username}'s List </h1>
            <h4>User's Score: {rating}</h4>
            <div className="grid">
                {
                    fav.length > 0 ? fav.map(fav => (
                        <Movies key={fav._id} movie={fav} />
                    )) :
                        <p>User does not have any Favourite Movies yet</p>
                }
            </div>

        </div>
    );
}

export default UserFav;
