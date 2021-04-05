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
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
/**
 * Routes definition
 * @returns routes
 */
export default function Routes() {
    return (
        <BrowserRouter>
            <PublicRoute path="/login">
                <Login/>
            </PublicRoute>
            <PublicRoute path="/signup">
                <Signup/>
            </PublicRoute>
            <PrivateRoute path='/dashboard'>
                <Dashboard />
            </PrivateRoute>
            <Route exact path="/">
                <Redirect to="/signup" />
            </Route>
        </BrowserRouter>
    );
}