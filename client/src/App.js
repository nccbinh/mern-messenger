/**
 * App
 * @author Hatchways
 * @since 0.1.0
 */
import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import "./styles/App.css";
import Routes from './routes';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes/>
    </MuiThemeProvider>
  );
}

export default App;
