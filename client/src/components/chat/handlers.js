// handlers for chat pane
exports.chatPaneHandlers = (context) => {
  return {
    // handles submit message
    // msg = message object
    onSubmit: (msg) => {
      if (msg.id) {
        // sends message to an existing conversation
        const message = {
          id: msg.id,
          message: msg.message,
        };
        MessageService.newMessage(message, context.online[msg.name]).then(
          (res) => {
            fetchMessages(res.id, msg.name);
            fetchConversations();
          }
        );
      } else {
        // starts a new conversation
        const message = {
          to: msg.name,
          time: new Date(),
          message: msg,
        };
        MessageService.startNewConversation(
          message,
          context.online[msg.name]
        ).then((id) => {
          fetchConversations();
          // sets conversation ID to chat pane
          // const conv = conversation;
          // conv.messages = [message];
          // setConversation(conv);
        });
      }
    },
    // handles click on open sidebar button in header
    onOpenSidebar: () => {
      //setShowSidebar(!showSidebar);
    },
  };
};

// handlers for sidebar
exports.sidebarHandlers = (context) => {
  return {
    // handles selecting a user/conversation
    // id = conversation ID, name = user
    onClick: (id, name) => {
      // tries getting conversation if any
      if (!id) {
        const c = context.sidebar.chats.find((c) => c.name === name);
        if (c) id = c.id;
      }
      if (!id) {
        // starts a new chat
        // const conv = {
        //   name: name,
        //   messages: [],
        //   online: online[name] != null,
        // };
        // setConversation(conv);
      } else {
        // loads existing chat
        // fetchMessages(id, name);
      }
    },
    // handles user search
    // keyword = search term
    onSearch: (keyword) => {
      setSearch(keyword);
      if (!keyword || keyword.length < 3) {
        setUsers([]);
        return;
      }
      //setSearching(true);
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
    },
    // handles user logout
    onLogout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("uid");
      window.location.href = "/login";
      MessageService.disconnect();
    },
    // handles open sidebar
    onShow: () => {},
    // handles close sidebar
    onClose: () => {},
  };
}
