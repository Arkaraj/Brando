import React, { useState, useEffect } from 'react';
import Search from './Search'
import Movies from './Movies'


const MovieSearch = (props) => {

    const [flim, setFlim] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)
    // get flim
    const name = props.match.params.movieName

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${name}`)
            .then(res => res.json())
            .then(data => {
                setFlim(data.results)
                setIsLoaded(true)
            })

    }, [name]) // Runs when name changes

    return (
        <>
            <Search history={props.history} />
            <div className="gridx">
                {
                    isLoaded ?
                        flim.length > 0 ? flim.map(flim => (
                            <Movies key={flim.id} movie={flim} />
                        )) : (
                            <p>No Moives</p>
                        ) : (<p className="loading"></p>)
                }
            </div>
            {/* Pagination needed */}
        </>
    );
}

export default MovieSearch;
