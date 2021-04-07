/**
 * Chat Pane Body
 * @author Binh Nguyen
 * @since 0.1.0
 */
 import React from 'react';
 import ChatMessage from "./ChatMessage";
 import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chatPaneBody: {
        height: "calc(100vh - 13rem)",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "1rem"
    }
}));
 
 export default function ChatPaneBody({ name, avatar}) {
     const classes = useStyles();
     return (
         <Box className={classes.chatPaneBody}>
             <ChatMessage message="Where are you from?" from={name} avatar={avatar} time="10:45" />
             <ChatMessage message="I'm from New York" time="10:51"/>
         </Box>
     );
 }