/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import { CssBaseline, Box, makeStyles } from '@material-ui/core';
import ChatPane from "../components/chat/ChatPane";
import ChatSidebar from "../components/chat/ChatSidebar";
import Avatar1 from "../assets/images/avatar/7.png";
import Avatar2 from "../assets/images/avatar/2.png";
import Avatar3 from "../assets/images/avatar/3.png";
import Avatar4 from "../assets/images/avatar/4.png";

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
  const username = localStorage.getItem("user");
  const users = [
    {
      id: 0,
      name: "santiago",
      lastUpdate: "",
      preview: "Where are you from?",
      unread: false,
      online: true
    },
    {
      id: 1,
      name: "chiumbo",
      lastUpdate: "",
      preview: "Sure! What time?",
      unread: true,
      online: false
    },
    {
      id: 2,
      name: "hualing",
      lastUpdate: "",
      preview: "Do you have any plan?",
      unread: false,
      online: false
    }
  ];
  const messages = [
    {
      name: "santiago",
      time: new Date(),
      message: "Where are you from?"
    },
    {
      time: new Date(),
      message: "I'm from New York"
    }
  ];

  const handleOpenSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSubmitMessage = (msg) => {
    console.log(msg);
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <ChatSidebar
        username={username}
        avatar={Avatar1}
        conversations={users}
        openSidebar={showSidebar}
        logoutHandler={handleLogout}
        closeSidebarHandler={handleOpenSidebar} />
      <ChatPane
        name="santiago"
        online={true}
        messages={messages}
        messageHandler={handleSubmitMessage}
        openSidebarHandler={handleOpenSidebar} />
    </Box>
  );
}
