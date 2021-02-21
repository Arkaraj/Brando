import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";

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

        <form className="p-8" onSubmit={Submit}>
            <div className="bg-transparent w-full sm:w-1/4 h-1/2 flex items-center rounded-none border-b-2 focus-within:border-blue-500">
                <input className="bg-transparent w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
                <div className="p-1">
                    <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                        <BsSearch />
                    </button>
                </div>
            </div>
        </form>
        // <form className="p-8" onSubmit={Submit}>
        //     <div className="bg-white w-1/4 h-1/2 flex items-center rounded-full shadow-xl">
        //         <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
        //         <div className="p-1">
        //             <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">

        //             </button>
        //         </div>
        //     </div>
        // </form>

    );
}

export default Search;
