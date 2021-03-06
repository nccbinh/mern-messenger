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
  const chatRef = React.useRef();

  React.useLayoutEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  });

  return (
    <Box ref={chatRef} className={classes.chatPaneBody}>
      {context.chat.messages.map((msg, ind) => {
        return <ChatMessage params={msg} key={ind} />;
      })}
    </Box>
  );
}
