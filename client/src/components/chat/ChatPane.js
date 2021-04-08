/**
 * Chat Pane
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React from "react";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatPaneBody";
import { Box, Typography, makeStyles } from "@material-ui/core";
import ChatBubble from "../../assets/images/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  overlay: {
    height: "calc(100vh - 6rem)",
    width: "100%",
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },
  gradient: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58, 141, 255, 0.85) 0%, rgb(134, 185, 255, 0.85) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    height: "calc(100vh - 6rem)",
    width: "100%",
    paddingBottom: 145,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  heroText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
  },
}));

export default function ChatPane({
  name,
  avatar,
  online,
  messages,
  messageHandler,
  openSidebarHandler,
}) {
  const classes = useStyles();
  return name ? (
    <Box className={classes.root}>
      <ChatPaneHeader
        name={name}
        online={online}
        openSidebarHandler={openSidebarHandler}
      />
      <ChatBody avatar={avatar} messages={messages} name={name} />
      <ChatInput messageHandler={messageHandler} />
    </Box>
  ) : (
    <Box className={classes.root}>
      <ChatPaneHeader
        name={name}
        online={online}
        openSidebarHandler={openSidebarHandler}
      />
      <Box className={classes.overlay}>
        <Box className={classes.gradient}>
          <img src={ChatBubble} alt="" width={67} />
          <Typography className={classes.heroText}>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
