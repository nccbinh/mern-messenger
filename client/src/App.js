/**
 * App
 * @since 0.1.0
 */
import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/themes/theme.js";
import "./assets/styles/App.css";
import Routes from './routes';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes/>
    </MuiThemeProvider>
  );
}

export default App;
