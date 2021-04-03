/**
 * App
 * @author Hatchways
 * @since 0.1.0
 */
import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./styles/App.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("user"));
  const PrivateRoute  = ({ children, ...rest }) => {
    return (
      <Route {...rest} render={() => {
        return loggedIn
          ? children
          : <Redirect to='/login' />
      }} />
    )
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path='/dashboard'>
          <Dashboard/>
        </PrivateRoute>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
