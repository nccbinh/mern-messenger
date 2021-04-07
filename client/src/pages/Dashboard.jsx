/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import { CssBaseline, Box, makeStyles } from '@material-ui/core';
import ChatPane from "../components/chat/ChatPane";
import ChatSidebar from "../components/chat/ChatSidebar";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    display: "flex"
  }
}));

/**
 * Dashboard page implementation
 */
export default function Dashboard() {
  const classes = useStyles();
  const [showSidebar, setShowSidebar] = React.useState(false); 
  const handleOpenSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <ChatSidebar openSidebar={showSidebar} closeSidebarHandler={handleOpenSidebar}/>
      <ChatPane openSidebarHandler={handleOpenSidebar}/>
    </Box>
  );
}
