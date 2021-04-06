/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../assets/styles/authentication";
import ChatPane from "../components/chat/ChatPane";
import ChatSidebar from "../components/chat/ChatSidebar";

/**
 * Dashboard page implementation
 */
export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <ChatSidebar />
      <ChatPane />
    </Grid>
  );
}
