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
            <div className="gridx profile">
                {
                    others.length > 0 ?
                        others.map(other => (

                            <Other key={other._id} other={other} />

                        ))
                        : <p>No Users are there</p>
                }
            </div>
        </>
    );
}

export default Connect;
