import React, { useState, useEffect, useContext } from 'react';
import Favmovie from './Favmovie'
import { AuthContext } from '../Context/AuthContext'
import NoMovie from '../Images/noMovies.svg'

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
            <h1 className="text-center text-2xl font-bold">Hi, Your Favourite Movies are: </h1>

            {cine.length > 0 ? (
                <div className="favgrid">
                    {cine.map(mov => (
                        <Favmovie key={mov.id} movie={mov} />
                    ))}
                </div>
            ) : (
                    <p className="text-center text-2xl font-bold">
                        <img className="mx-auto" src={NoMovie} alt="No Favourites" />
                            Looks Like you have not Marked any Movies as Favourite yet!</p>
                )}

        </div>
    );
}

export default Favourite;
