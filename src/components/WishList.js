import React, { useState, useEffect, useContext } from 'react';
import MovieService from '../Services/MovieService'
import { AuthContext } from '../Context/AuthContext'
import Wish from './Wish';

const WishList = () => {

    const { user } = useContext(AuthContext)

    const [towatch, setToWatch] = useState([])

    useEffect(() => {
        MovieService.getWishList(user._id)
            .then(data => {
                setToWatch(data)
                // console.log(data)
            })
    }, [])

    return (
        <div>
            <h1 className="text-xl font-bold mb-2 capitalize">WishList here</h1>

            {
                towatch.length > 0 ? towatch.map((wish, index) => (
                    <Wish key={index} tmdbId={wish.id} />
                    // <p>Workssss</p>
                )) : <p>Sorry, you have got no WatchList!!</p>
            }

        </div>
    );
}

export default WishList;
