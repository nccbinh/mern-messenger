/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import { CssBaseline, Box, makeStyles } from "@material-ui/core";
import ChatPane from "../components/chat/ChatPane";
import ChatSidebar from "../components/chat/ChatSidebar";
import Avatar1 from "../assets/images/avatar/7.png";
import Avatar2 from "../assets/images/avatar/2.png";
import Avatar3 from "../assets/images/avatar/3.png";
import Avatar4 from "../assets/images/avatar/4.png";
const MessageService = require("../services/messageService");

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "flex",
  },
}));

/**
 * Dashboard page implementation
 */
export default function Dashboard() {
  const classes = useStyles();
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [currentConversation, setCurrentConversation] = React.useState("");
  const [conversations, setConversations] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [to, setTo] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const username = localStorage.getItem("user");
  // const users = [
  //   {
  //     id: 0,
  //     name: "santiago",
  //     lastUpdate: "",
  //     preview: "Where are you from?",
  //     unread: false,
  //     online: true,
  //   },
  //   {
  //     id: 1,
  //     name: "chiumbo",
  //     lastUpdate: "",
  //     preview: "Sure! What time?",
  //     unread: true,
  //     online: false,
  //   },
  //   {
  //     id: 2,
  //     name: "hualing",
  //     lastUpdate: "",
  //     preview: "Do you have any plan?",
  //     unread: false,
  //     online: false,
  //   },
  // ];
  // const messages = [
  //   {
  //     name: "santiago",
  //     time: new Date(),
  //     message: "Where are you from?",
  //   },
  //   {
  //     time: new Date(),
  //     message: "I'm from New York",
  //   },
  // ];

  const fetchConversations = () => {
    MessageService.getConversations().then((conv) => {
      if (!conv || !conv.map) return;
      setConversations(
        conv.map((c) => {
          return {
            id: c.id,
            name:
              username == c.participants[0].username
                ? c.participants[1].username
                : c.participants[0].username,
            lastUpdated: c.lastUpdated,
            preview: c.preview ? c.preview.content : "",
          };
        })
      );
    });
  };

  const handleOpenSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    MessageService.disconnect();
  };

  const handleSubmitMessage = (msg) => {
    console.log(msg);
    const message = {
      cid: "",
      message: "",
    };
  };

  const handleSearch = (keyword) => {
    setSearch(keyword);
    if (!keyword || keyword.length < 3) {
      setUsers([]);
      return;
    }
    setSearching(true);
    MessageService.search(keyword).then((res) => {
      const results = [];
      res.users.map((u) => {
        if (u.username !== username)
          results.push({
            id: u._id,
            name: u.username,
            lastUpdated: 0,
          });
      });
      console.log(results);
      setUsers(results);
      setSearching(false);
    });
  };

  const handleSocketError = (err) => {
    // signs out if token is expired
    if (err === "Unauthorized") {
      handleLogout();
    }
  };

  const handleOnline = (users) => {
    console.log(users);
  };

  const handleReceiveMessage = (msg) => {
    console.log(msg);
  };

  // connects socket
  MessageService.connect(handleSocketError, handleOnline, handleReceiveMessage);

  React.useEffect(() => {
    // fetch conversations
    fetchConversations();
  }, []);

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <ChatSidebar
        username={username}
        conversations={search ? users : conversations}
        openSidebar={showSidebar}
        logoutHandler={handleLogout}
        searchHandler={handleSearch}
        searchLoading={searching}
        closeSidebarHandler={handleOpenSidebar}
      />
      <ChatPane
        name={to}
        online={true}
        messages={messages}
        messageHandler={handleSubmitMessage}
        openSidebarHandler={handleOpenSidebar}
      />
    </Box>
  );
}
