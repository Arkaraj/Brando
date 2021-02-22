import React, { useContext } from 'react';
import authService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'

const Profile = (props) => {

    const { user, setIsAuthenticated } = useContext(AuthContext)

    const deleteUser = () => {
        authService.delete(user._id).then(data => {
            setIsAuthenticated(false)
            props.history.push('./')
        })
    }

    const rating = user.rating ? user.rating.toFixed(2) : 0

    return (
        <div>
            <h1> Your Favourite List Rating is: {rating}, It was Rated {user.views} times</h1>
            <button onClick={deleteUser}>Delete User</button>
        </div>
    );
}

export default Profile;
