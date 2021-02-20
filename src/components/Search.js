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

        //history.push(`/search/${searchTerm}`)

    }

    return (
        <form onSubmit={Submit}>                         
                <input id="searchbar" placeholder="Search" type="text" value={text} onChange={e => setText(e.target.value)}/><button id="searchbtn">Submit</button>              
        </form>
    );
}

export default Search;
