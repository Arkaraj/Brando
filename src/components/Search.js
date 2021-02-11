import React, { useState } from 'react';

const Search = ({ setMovies }) => {

    const [text, setText] = useState('')

    const Submit = (e) => {
        e.preventDefault()
        if (text.length < 1) {
            alert('Plese enter a search term')
            return;
        }
        const searchTerm = text.toLowerCase().replace(/ /g, '+')

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=dca6ba47ee045002b2c647232f48e550&query=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
            })
    }

    return (
        <>
            <form onSubmit={Submit}>
                Search
            <input placeholder="Search title" type="text" value={text} onChange={e => setText(e.target.value)} />
            </form>
        </>
    );
}

export default Search;
