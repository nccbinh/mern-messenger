/**
 * Private Route
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute ({ children, ...rest }) {
    const loggedIn = localStorage.getItem("user");
    return (
        <Route {...rest} render={() => {
            // redirects to login if not logged in
            return loggedIn
                ? children
                : <Redirect to='/login' />
        }} />
    )
};