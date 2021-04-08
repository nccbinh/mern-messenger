/**
 * Chat Pane Body
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from "react";
import ChatMessage from "./ChatMessage";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chatPaneBody: {
    height: "calc(100vh - 13rem)",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "1rem",
  },
}));

export default function ChatPaneBody({ name, avatar, messages = [] }) {
  const classes = useStyles();

  return (
    <Box className={classes.chatPaneBody}>
      {messages.map((msg, ind) => {
        return (
          <ChatMessage
            key={ind}
            from={msg.name}
            avatar={avatar}
            message={msg.message}
            time={msg.time}
          />
        );
      })}
    </Box>
  );
}
