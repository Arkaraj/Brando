import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

const Search = ({ history }) => {

    const [text, setText] = useState('')

    const Submit = (e) => {
        e.preventDefault()

        if (text.length < 1) {
            alert('Plese enter a search term')
            return;
        }
        const searchTerm = text.toLowerCase().replace(/ /g, '+')

        history.push(`/search/${searchTerm}`)

    }

    return (
        // <form onSubmit={Submit}>
        //     Search
        //     <input id="bar" placeholder="Search title" type="text" value={text} onChange={e => setText(e.target.value)} />
        //     <button id="btn">Submit</button>
        // </form>

        <form className="p-8" onSubmit={Submit}>
            <div className="bg-white w-1/4 h-1/2 flex items-center rounded-full shadow-xl">
                <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
                <div className="p-1">
                    <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                        icon
            </button>
                </div>
            </div>
        </form>

    );
}

export default Search;
