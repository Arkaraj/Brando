import React from 'react'
import { Link } from 'react-router-dom'
import Error404 from '../Images/404.svg'

function page404() {
    return (
        <>
            <img src={Error404} alt="React Logo" />
            <Link to="/">Go Back to Home Page</Link>
        </>
    )
}

export default page404
