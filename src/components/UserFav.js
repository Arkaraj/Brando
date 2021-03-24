import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService'
import Movies from './Movies'

const UserFav = (props) => {
    const id = props.match.params.id

    const dummy = {
        username: "",
        rating: 0,
        views: 0
    }

    const { username, rating, views } = props.location.state ? props.location.state : dummy

    const [fav, setFav] = useState([])
    const [rate, setRate] = useState(0)
    const [check, setCheck] = useState(true)

    useEffect(() => {

        const RecieveData = async () => {
            const Alldata = await UserService.allFavMovies(id).then(data => data)

            if (Alldata.message.msgError) {
                setCheck(false)
                return;
            }

            else {
                const data = Alldata.favourites ? Alldata.favourites : []

                data.map((mv) => {
                    fetch(`https://api.themoviedb.org/3/movie/${mv.id}?api_key=${process.env.REACT_APP_API_KEY}`).then(res => res.json()).then(data => {
                        setFav(prev => [...prev, data])
                    })
                })
            }

        }

        RecieveData();

    }, [id])

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
            {
                check ?
                    <><h1>{username}'s List </h1>
                        <h4>User's Score: {rating.toFixed(2)} ({views})</h4>
                        <div className="container w-32 mx-4">
                            <div className="vertical-center">
                                <div className="custom-number-input h-10 w-32">
                                    <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Rate User</label>
                                    <form onSubmit={Submit}>
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

                                </div>
                            </div>
                        </div>
                        {/* <form onSubmit={Submit}>
                    <p>Rate User: <input type="number" min="0" max="10" value={rate} onChange={giveRating} />
                        <button>Submit Rating</button>
                    </p>
    
                </form> */}
                        <div className="gridx mt-12">
                            {
                                fav.length > 0 ? fav.map(fav => (
                                    <Movies key={fav._id} movie={fav} />
                                )) :
                                    <p>User does not have any Favourite Movies yet</p>
                            }
                        </div></> : <h1>Invalid User</h1>
            }

        </div>
    );
}

export default UserFav;
