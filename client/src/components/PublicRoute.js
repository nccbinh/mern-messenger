/**
 * Public Route
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PublicRoute ({ children, ...rest }) {
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("user"));
    console.log("public route: ", loggedIn);
    return (
        <Route {...rest} render={() => {
            // redirects to dashboard if logged in
            return loggedIn
                ? <Redirect to='/dashboard' />
                : children
        }} />
    )
};