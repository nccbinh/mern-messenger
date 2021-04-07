/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import ChatPane from "../components/chat/ChatPane";
import ChatSidebar from "../components/chat/ChatSidebar";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white"
  }
}));

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
