/**
 * Main Theme
 * Theme definition
 * @since 0.1.0
 */
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans'",
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  }
});
