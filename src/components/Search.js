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

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`)
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
                <button>Submit</button>
            </form>
        </>
    );
}

export default Search;
