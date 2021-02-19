import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext()

export default ({ children }) => {

    // Global state
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isloaded, setIsLoaded] = useState(false)

    useEffect(() => {

        AuthService.isAuthenticated().then(data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
        })
    }, []) // Execute once

    return (
        <div>
            {!isloaded ? <h1>Loading</h1> : <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
            }
        </div>
    )
}

