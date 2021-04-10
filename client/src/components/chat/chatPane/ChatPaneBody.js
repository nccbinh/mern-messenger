/**
 * Chat Pane Body
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React, { useContext } from "react";
import ChatMessage from "./ChatMessage";
import { Box, makeStyles } from "@material-ui/core";
import ChatContext from "../ChatContext";

const useStyles = makeStyles((theme) => ({
  // TODO: use flex-direction: column-reverse to keep it scrolled to the bottom
  chatPaneBody: {
    height: "calc(100vh - 13rem)",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "1rem",
  },
}));

export default function ChatPaneBody() {
  const context = useContext(ChatContext);
  const classes = useStyles();

  return (
    <Box className={classes.chatPaneBody}>
      {context.chat.messages.map((msg, ind) => {
        console.log(msg);
        return <ChatMessage params={msg} key={ind} />;
      })}
    </Box>
  );
}
