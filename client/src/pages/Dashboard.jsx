/**
 * Dashboard Page
 * @since 0.1.0
 */
import React from "react";
import { CssBaseline, Box, makeStyles } from "@material-ui/core";
import ChatPane from "../components/chat/chatPane/ChatPane";
import ChatSidebar from "../components/chat/sidebar/ChatSidebar";
import ChatContext from "../components/chat/ChatContext";
import Snackbar from "@material-ui/core/Snackbar";
import { CollectionsOutlined } from "@material-ui/icons";
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
  // dashboard context
  // may limit component reusability
  // TODO: find a way to improve the ease of updating nested values
  // either with reducer, flattening the object, or with a library
  const [context, setContext] = React.useState({
    // logged in user
    user: {
      id: localStorage.getItem("uid"),
      username: localStorage.getItem("user"),
      avatar: null,
    },
    // sidebar params
    sidebar: {
      chats: [], // list of conversations
      users: [], // list of matching users (when searching)
      show: false, // show/hide sidebar in compact mode
      busy: false, // is searching for users/loading
    },
    // chatpane params
    chat: {
      id: "", // id of current conversation
      name: "", // name of the other user in the conversation
      uid: "", // id of the other user
      avatar: null, // user avatar
      messages: [], // messages in conversation
    },
    // online user list as an object
    online: {}, // structure: online.<username> = <socket ID>
  });

  // handlers for chat pane
  const chatPaneHandlers = {
    // handles submit message
    // msg = message object
    onSubmit: (msg) => {
      if (context.chat.id) {
        // sends message to an existing conversation
        const message = {
          sid: context.online[context.chat.name],
          id: context.chat.id,
          message: msg,
        };
        MessageService.newMessageSocket(message);
      } else {
        // starts a new conversation
        const message = {
          sid: context.online[context.chat.name],
          to: { username: context.chat.name, id: context.chat.uid },
          message: msg,
        };
        MessageService.newChatSocket(message);
      }
    },
    // handles click on open sidebar button in header
    onOpenSidebar: () => {
      //setShowSidebar(!showSidebar);
      setContext((prevContext) => ({
        ...prevContext,
        sidebar: { ...prevContext.sidebar, show: true },
      }));
    },
  };

  // handlers for sidebar
  const sidebarHandlers = {
    // handles selecting a user/conversation
    // id = conversation ID, name = user
    onClick: (id, name, uid) => {
      // tries getting conversation if any
      if (!id) {
        const c = context.sidebar.chats.find((c) => c.name === name);
        if (c) id = c.id;
      }
      if (!id) {
        // starts a new chat
        const chat = {
          name: name,
          messages: [],
          uid: uid,
        };
        setContext((prevContext) => ({
          ...prevContext,
          chat: chat,
        }));
      } else {
        // loads existing chat
        fetchMessages(id, name);
      }
    },
    // handles user search
    // keyword = search term
    onSearch: (keyword) => {
      if (!keyword || keyword.length < 3) {
        // updates chats in context
        setContext((prevContext) => ({
          ...prevContext,
          sidebar: { ...prevContext.sidebar, users: [] },
        }));
        return;
      } else {
        // updates chats in context
        setContext((prevContext) => ({
          ...prevContext,
          sidebar: { ...prevContext.sidebar, busy: true },
        }));
      }
      // starts searching
      MessageService.search(keyword).then((res) => {
        const results = [];
        res.users.map((u) => {
          if (u.username !== context.user.username) {
            results.push({
              name: u.username,
              uid: u._id,
              lastUpdated: 0,
              preview: "", // TODO: search in conversations to show preview
            });
          }
        });
        setContext((prevContext) => ({
          ...prevContext,
          sidebar: { ...prevContext.sidebar, busy: false, users: results },
        }));
      });
    },
    // handles user logout
    onLogout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("uid");
      window.location.href = "/login";
      MessageService.disconnect();
    },
    // handles close sidebar
    onClose: () => {
      setContext((prevContext) => ({
        ...prevContext,
        sidebar: { ...prevContext.sidebar, show: false },
      }));
    },
  };

  // socket handlers
  const socketHandlers = {
    // handles errors
    // err = error object
    onError: (err) => {
      // signs out if token is expired
      if (err === "Unauthorized") {
        sidebarHandlers.onLogout();
      }
    },
    // handles receiving list of online users
    // users = online user list
    onOnline: (users) => {
      setContext((prevContext) => ({
        ...prevContext,
        online: users,
      }));
    },
    // handles new conversation received
    // chat = conversation object
    onChat: (chat) => {
      const name = chat.participants.filter(
        (u) => u.username !== context.user.username
      )[0];
      const conv = {
        id: chat.id,
        name: name.username,
        uid: name._id,
        lastUpdated: chat.lastUpdated,
        preview: chat.preview ? chat.preview.content : "",
      };
      // checks if the new chat is the same as the new one in chat pane
      if (!context.chat.id && context.chat.name) {
        // adds the chat to sidebar and reload the chat in chat pane

        setContext((prevContext) => ({
          ...prevContext,
          sidebar: {
            ...prevContext.sidebar,
            chats: [conv, ...prevContext.sidebar.chats],
          },
          chat: {
            id: chat.id,
            name: context.chat.name,
            messages: [
              {
                from:
                  chat.preview.author === context.user.id
                    ? ""
                    : context.chat.name,
                time: new Date(chat.preview.created),
                message: chat.preview.content,
              },
            ],
          },
        }));
      } else {
        // adds only the new chat to sidebar list
        setContext((prevContext) => ({
          ...prevContext,
          sidebar: {
            ...prevContext.sidebar,
            chats: [conv, ...prevContext.sidebar.chats],
          },
        }));
      }
    },
    // handles new message received
    // msg = chat message object
    onMessage: (msg) => {
      const message = {
        from: msg.from === context.user.username ? "" : msg.from,
        time: new Date(msg.time),
        message: msg.message,
      };
      const chats = [...context.sidebar.chats];
      const chat = chats.find((c) => c.id === msg.id);
      if (!chat) return;
      chat.preview = msg.message;
      if (msg.id === context.chat.id) {
        // adds new message to the current chat and sidebar
        setContext((prevContext) => ({
          ...prevContext,
          chat: {
            ...prevContext.chat,
            messages: [...prevContext.chat.messages, message],
          },
          sidebar: {
            ...prevContext.sidebar,
            chats: chats,
          },
        }));
      } else {
        // only adds to sidebar
        setContext((prevContext) => ({
          ...prevContext,
          sidebar: {
            ...prevContext.sidebar,
            chats: chats,
          },
        }));
      }
    },
  };

  // fetches all conversations
  const fetchConversations = () => {
    MessageService.getConversations().then((conv) => {
      if (!conv || !conv.map) return;
      const chats = conv.map((c) => {
        const name = c.participants.filter(
          (u) => u.username !== context.user.username
        )[0];
        return {
          id: c.id,
          name: name.username,
          uid: name._id,
          lastUpdated: c.lastUpdated,
          preview: c.preview ? c.preview.content : "",
        };
      });
      // updates chats in context
      setContext((prevContext) => ({
        ...prevContext,
        sidebar: { ...prevContext.sidebar, chats: chats },
      }));
    });
  };

  // fetches all messages of a conversation
  const fetchMessages = (id, name) => {
    MessageService.getConversation(id).then((msgs) => {
      const messages = msgs.map((m) => {
        return {
          from: m.author === context.user.id ? "" : name,
          time: new Date(m.created),
          message: m.content,
        };
      });
      const chat = {
        id: id,
        name: name,
        messages: messages,
      };
      // updates the conversation in context
      setContext((prevContext) => ({
        ...prevContext,
        chat: chat,
      }));
    });
  };

  // initialization
  React.useEffect(() => {
    // connects socket
    MessageService.connect();
    // fetch conversations
    fetchConversations();
  }, []);

  // resets handlers
  React.useEffect(() => {
    // set handlers
    MessageService.setHandlers(socketHandlers);
  }, [context]);

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <ChatContext.Provider value={context}>
        <ChatSidebar handlers={sidebarHandlers} />
        <ChatPane handlers={chatPaneHandlers} />
      </ChatContext.Provider>
    </Box>
  );
  // TODO: add Snackbar for showing error/message
}
