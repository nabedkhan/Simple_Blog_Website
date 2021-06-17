import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AppContext';

const PrivateRoute = ({ children, ...rest }) => {
    const { loggedInUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser && loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
