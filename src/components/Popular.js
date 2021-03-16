import React, { useState, useEffect } from 'react';
import Movies from './Movies';
import Search from './Search';
import Pagination from './Pagination';

const Popular = (props) => {

    const [movies, setMovies] = useState([])

    let pageNumber = props.match.params.page || 1

    pageNumber = isNaN(pageNumber) ? 0 : pageNumber

    pageNumber = pageNumber === 0 ? 0 : (pageNumber * pageNumber) / pageNumber

    useEffect(() => {

        if (pageNumber < 1) {
            props.history.push('/')
        }

        fetch(`https://api.themoviedb.org/3/movie/${props.case}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })

    }, [pageNumber, props.case, props.history])


    return (
        <>
            <Search history={props.history} />
            <div className="gridx">
                {
                    movies ? movies.length > 0 ? movies.map(movie => (
                        <Movies key={movie.id} movie={movie} />
                    )) : (
                        <p className></p>
                    ) : <p>You have Ventured out to far!!</p>
                }
            </div>
            <Pagination pcase={props.case} page={pageNumber} />
        </>
    );
}

export default Popular;
