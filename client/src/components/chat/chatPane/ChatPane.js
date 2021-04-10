/**
 * Chat Pane
 * @author Binh Nguyen
 * @since 0.1.0
 */
import React, { useContext } from "react";
import ChatPaneHeader from "./ChatPaneHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatPaneBody";
import { Box, Typography, makeStyles } from "@material-ui/core";
import ChatContext from "../ChatContext";
import ChatBubble from "../../../assets/images/bubble.svg";

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
    justifyContent: "center",
  },
  heroText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
  },
}));

export default function ChatPane({ handlers }) {
  const context = useContext(ChatContext);
  const classes = useStyles();
  return context.chat.name ? (
    <Box className={classes.root}>
      <ChatPaneHeader handlers={handlers} />
      <ChatBody />
      <ChatInput handlers={handlers} />
    </Box>
  ) : (
    <Box className={classes.root}>
      <ChatPaneHeader handlers={handlers} />
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
