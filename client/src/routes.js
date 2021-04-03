/**
 * Routes
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

/**
 * Routes definition
 * @returns routes
 */
export default function Routes() {
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("user"));
    // checks for authentication
    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route {...rest} render={() => {
                return loggedIn
                    ? children
                    : <Redirect to='/login' />
            }} />
        )
    };
    return (
        <BrowserRouter>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path='/dashboard'>
                <Dashboard />
            </PrivateRoute>
            <Route exact path="/">
                <Redirect to="/signup" />
            </Route>
        </BrowserRouter>
    );
}