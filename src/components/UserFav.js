import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService'
import Movies from './Movies'

const UserFav = (props) => {
    const id = props.match.params.id

    const { username, rating, views } = props.location.state

    const [fav, setFav] = useState([])
    const [rate, setRate] = useState(0)

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

    const giveRating = e => {
        // Stackoverflowed this technique to validate min 0 and max 10
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setRate(value);
    }

    const Submit = e => {
        e.preventDefault()

        UserService.rateUser(id, rate).then(data => {
            alert('Updated Rating!!')
            props.history.push('/connect')
        })

    }

    return (
        <div>
            <h1>{username}'s List </h1>
            <h4>User's Score: {rating} ({views})</h4>
            <form onSubmit={Submit}>
                <p>Rate User: <input type="number" min="0" max="10" value={rate} onChange={giveRating} />
                    <button>Submit Rating</button>
                </p>

            </form>
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
