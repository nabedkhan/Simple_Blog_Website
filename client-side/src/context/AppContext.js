import React, { createContext, useState } from 'react';

export const AuthContext = createContext();
const getUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const AppContext = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(getUser);
    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AppContext;
