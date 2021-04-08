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
            preview: c.preview ? c.preview.content : "",
          };
        })
      );
    });
  };

  const fetchMessages = (id, name) => {
    MessageService.getConversation(id).then((msgs) => {
      const messages = msgs.map((m) => {
        return {
          name: m.author === uid ? "" : name,
          time: new Date(m.created),
          message: m.content,
        };
      });
      let conv = {};
      conv.id = id;
      conv.name = name;
      conv.online = chatHelper.checkOnline(name, online) != null;
      conv.messages = messages;
      setConversation(conv);
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
    if (conversation.id) {
      // sends message to an existing conversation
      const message = {
        id: conversation.id,
        message: msg,
      };
      MessageService.newMessage(
        message,
        chatHelper.checkOnline(conversation.name, online)
      ).then((res) => {
        fetchMessages(res.id, conversation.name);
        fetchConversations();
      });
    } else {
      // starts a new conversation
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
    }
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
            lastUpdated: 0,
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
      fetchMessages(id, name);
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

  const handleReceiveMessage = (id) => {
    if(id === conversation.id) {
      fetchMessages(id, conversation.name);
    }
    fetchConversations();
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
        selected={conversation.name}
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
