import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext()

// eslint-disable-next-line import/no-anonymous-default-export
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
            {!isloaded ? <p className="loading"></p> : <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
            }
        </div>
    )
}

