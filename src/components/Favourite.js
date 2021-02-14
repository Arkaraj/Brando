import React, { useState, useEffect } from 'react';
import Favmovie from './Favmovie'

const Favourite = () => {

    const [cine, setCine] = useState([])

    const fetchCine = async () => {
        const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/movies`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getCine = async () => {
            const cineFromServer = await fetchCine()
            setCine(cineFromServer)
        }

        getCine()
    }, [])

    return (
        <div>
            <h1>Hi, Your Favourite Movies are: </h1>

            <div className="favgrid">
                {cine.map(mov => (
                    <Favmovie key={mov.id} movie={mov} />
                ))}
            </div>

        </div>
    );
}

export default Favourite;
