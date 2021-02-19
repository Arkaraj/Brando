import React, { useState, useContext, useEffect } from 'react';
import UserService from '../Services/UserService'
import { AuthContext } from '../Context/AuthContext'
import Other from './Other'

const Connect = () => {

    const [others, setOther] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {

        UserService.view(user._id).then(data => {

            setOther(data)
        })

    }, [])

    return (
        <>
            {
                others.length > 0 ?
                    others.map(other => (
                        <div className="grid">
                            <Other key={other._id} other={other} />
                        </div>
                    ))
                    : <p>No Users are there</p>
            }

        </>
    );
}

export default Connect;
