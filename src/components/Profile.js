import React, { useState, useContext } from 'react';
import authService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import UserService from '../Services/UserService'

const Profile = (props) => {

    const { user, setIsAuthenticated } = useContext(AuthContext)
    const [status, setStatus] = useState('')
    const [currStatus, setCurrStatus] = useState(user.status)

    const deleteUser = () => {
        authService.delete(user._id).then(data => {
            setIsAuthenticated(false)
            props.history.push('./')
        })
    }

    const updateStatus = e => {
        e.preventDefault()

        UserService.updateStatus(status, user._id)
            .then(data => {
                setCurrStatus(status)
                alert('Updated!')
            })

    }

    const rating = user.rating ? user.rating.toFixed(2) : 0

    return (
        <div>
            <h1> Your Favourite List Rating is: {rating}, It was Rated {user.views} times</h1>
            <h3>Status: {currStatus}</h3>
            <form onSubmit={updateStatus}>
                <label>Update Status:</label>
                <input type="text" placeholder="Update Status" value={status} onChange={e => setStatus(e.target.value)} />
                <button className="mx-3 px-4 py-2 bg-blue-400 rounded" type="submit">Update Status 🖋</button>
            </form>
            <button className="mx-3 px-4 py-2 bg-red-500 rounded" onClick={deleteUser}>Delete User</button>
        </div>
    );
}

export default Profile;
