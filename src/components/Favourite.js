import React, { useState, useEffect, useContext } from 'react';
import Favmovie from './Favmovie'
import { AuthContext } from '../Context/AuthContext'

const Favourite = () => {

    const [cine, setCine] = useState([])
    const { user, isAuthenticated } = useContext(AuthContext)

    const fetchCine = async () => {
        const res = await fetch(`/user/movies/${user._id}`)
        const data = await res.json()

        return data.favourites
    }

    useEffect(() => {
        if (isAuthenticated) {
            const getCine = async () => {
                const cineFromServer = await fetchCine()
                setCine(cineFromServer)
            }

            getCine()
        }
    }, [])

    return (
        <div>
            <h1>Hi, Your Favourite Movies are: </h1>

            <div className="favgrid">
                {cine.length > 0 ? (
                    cine.map(mov => (
                        <Favmovie key={mov.id} movie={mov} />
                    ))
                ) : (
                        <p>You Have got No Favourite Movies yet!!</p>
                    )}
            </div>

        </div>
    );
}

export default Favourite;
