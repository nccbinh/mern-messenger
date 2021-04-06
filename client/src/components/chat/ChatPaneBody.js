/**
 * Chat Pane Body
 * @author Binh Nguyen
 * @since 0.1.0
 */
 import React from 'react';
 import Box from "@material-ui/core/Box";
 import { useStyles } from "../../assets/styles/chat";
 import ChatMessage from "./ChatMessage";
 
 export default function ChatPaneBody({ name, avatar}) {
     const classes = useStyles();
     return (
         <Box className={classes.chatPaneBody}>
             <ChatMessage message="Where are you from?" from={name} avatar={avatar} time="10:45" />
             <ChatMessage message="I'm from New York" time="10:51"/>
         </Box>
     );
 }