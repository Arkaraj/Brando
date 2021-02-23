import React from 'react';
import Tag from './Tag';

const Genres = () => {

    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"]

    // API call to get all genres, automation
    // const fetchData = () => {
    //     fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=dca6ba47ee045002b2c647232f48e550').then(res => res.json()).then(data => {
    //         data.genres.map(g => {
    //             genres.push(g.name)
    //         })
    //     })
    // }

    return (
        <div className="m-10">
            <h1 className="text-xl font-extrabold leading-none text-black sm:text-3xl md:text-xl">TAGS:</h1>

            <div className="m-5 p-5">
                <p>
                    {genres.map((genre, index) => (
                        <Tag key={index} genre={genre} />
                    ))}</p>
            </div>
        </div>
    );
}

export default Genres;
