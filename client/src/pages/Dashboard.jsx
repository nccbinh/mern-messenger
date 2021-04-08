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
const chatHelper = require("../helpers/chatHelper");
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
  const [conversations, setConversations] = React.useState([]);
  const [conversation, setConversation] = React.useState({
    name: "",
    online: false,
    messages: [],
  });
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [online, setOnline] = React.useState([]);
  const username = localStorage.getItem("user");
  const uid = localStorage.getItem("uid");
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
          const name =
            username == c.participants[0].username
              ? c.participants[1].username
              : c.participants[0].username;
          return {
            id: c.id,
            name: name,
            lastUpdated: c.lastUpdated,
            preview: c.preview ? c.preview.content : ""
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
    localStorage.removeItem("uid");
    window.location.href = "/login";
    MessageService.disconnect();
  };

  const handleSubmitMessage = (msg) => {
    console.log(msg);
    console.log(conversation);
    const message = {
      to: conversation.name,
      time: new Date(),
      message: msg,
    };
    MessageService.startNewConversation(
      message,
      chatHelper.checkOnline(conversation.name, online)
    ).then((id) => {
      fetchConversations();
      const conv = conversation;
      conv.messages = [message];
      setConversation(conv);
    });
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
        if (u.username !== username) {
          // TODO: search in existing conversations
          results.push({
            name: u.username,
            lastUpdated: 0
          });
        }
      });
      setUsers(results);
      setSearching(false);
    });
  };

  const handleListClick = (id, name) => {
    if (!id) {
      // clicks on user to start a new chat
      const conv = {
        name: name,
        messages: [],
        online: chatHelper.checkOnline(name, online) != null,
      };
      setConversation(conv);
    } else {
      // loads existing chat
      MessageService.getConversation(id).then((msgs) => {
        const messages = msgs.map((m) => {
          return {
            name: m.author === uid ? "" : name,
            time: new Date(m.created),
            message: m.content,
          };
        });
        let conv = {};
        conv.name = name;
        conv.online = chatHelper.checkOnline(name, online) != null;
        conv.messages = messages;
        setConversation(conv);
      });
    }
  };

  const handleSocketError = (err) => {
    // signs out if token is expired
    if (err === "Unauthorized") {
      handleLogout();
    }
  };

  const handleOnline = (users) => {
    setOnline(users);
  };

  const handleReceiveMessage = (msg) => {
    console.log(msg);
  };

  const handleNewChat = () => {
    fetchConversations();
  };

  React.useEffect(() => {
    // connects socket
    MessageService.connect(
      handleSocketError,
      handleOnline,
      handleReceiveMessage,
      handleNewChat
    );
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
        online={online}
        logoutHandler={handleLogout}
        searchHandler={handleSearch}
        searchLoading={searching}
        clickHandler={handleListClick}
        closeSidebarHandler={handleOpenSidebar}
      />
      <ChatPane
        name={conversation.name}
        online={conversation.online}
        messages={conversation.messages}
        messageHandler={handleSubmitMessage}
        openSidebarHandler={handleOpenSidebar}
      />
    </Box>
  );
}
