import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message';

const Register = (props) => {
    const [user, setUser] = useState({ email: "", username: "", password: "" })
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const Submit = e => {
        e.preventDefault()
        AuthService.register(user).then(data => {
            const { message } = data
            setMessage(message)
            if (!message.msgError) {
                setUser({ username: "", password: "", email: "" })

                props.history.push('./login');
            } else {

            }
        })
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <h3>Sign in</h3>
                <label>Email: </label>
                <input type="email" name="email" onChange={onChange} placeholder="Enter Email" />
                <label>Username: </label>
                <input type="text" name="username" onChange={onChange} placeholder="Enter Username" />
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

export default Register;
