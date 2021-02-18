import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';

const Login = (props) => {

    const [user, setUser] = useState({ email: "", password: "" })
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const Submit = e => {
        e.preventDefault()
        AuthService.login(user).then(data => {

            const { message } = data
            if (!message.msgError) {
                const { user, isAuthenticated } = data

                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated)
                // Kindda like redirect page
                props.history.push('./');

            } else {
                setMessage(message)
            }
        })
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <h3>Sign in</h3>
                <label>Email: </label>
                <input type="email" name="email" onChange={onChange} placeholder="Enter Email" />
                <label>Password: </label>
                <input type="password" name="password" onChange={onChange} placeholder="Enter Password" />
                <button type="submit">
                    Log in
                </button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default Login;
